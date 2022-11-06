import { Process, Processor } from '@nestjs/bull'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import * as Sdk from '@reservoir0x/sdk'
import { Network, Alchemy } from 'alchemy-sdk'
import axios from 'axios'
import { Job } from 'bull'
import pLimit from 'p-limit'
import { OrderService } from 'src/order/order.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { MarketplaceService } from '../marketplace/marketplace.service'
import { Seaport, SeaportOrder } from './seaport'

@Processor('sync-seaport')
export class SyncSeaportProcessor {
  private readonly logger = new Logger(SyncSeaportProcessor.name)

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private marketpalceService: MarketplaceService,
    private orderService: OrderService,
  ) {}
  //
  // @Process('fetch-orders-seaport')
  // async handleFetchOrdersSeaport(job: Job) {
  //   this.logger.log('Handling fetch-orders-seaport in sync-seaport queue')
  //   this.logger.log(job.data)
  // }

  @Process('fetch-orders')
  async handleFetchOrders(job: Job) {
    this.logger.log('Handling fetch-orders in sync-seaport queue')
    // this.logger.log(job.data)

    if (!job.data.addresses) {
      return
    }
    const addresses = job.data.addresses

    this.logger.log('Calling opensea API for marketplace...')
    // console.log({
    //   addresses,
    // })

    for (let i = 0; i < addresses.length; i++) {
      const seaport = new Seaport()
      let cursor = null
      const limit = 50
      const done = false
      const total = 0

      const url = seaport.buildFetchOrdersUrl({
        assetContractAddress: addresses[i],
        startTokenId: 0, // hardcoded
        endTokenId: 14, // hardcoded
        side: 'sell',
        orderBy: 'created_date',
        orderDirection: 'desc',
        limit,
        cursor,
      })
      // console.log({ url })
      try {
        const response = await axios.get(url, {
          timeout: 10000,
        })
        // console.log({
        //   responseData: response.data.orders,
        //   responseDataLength: response.data.orders.length,
        // })

        const orders: SeaportOrder[] = response.data.orders
        const parsedOrders: Sdk.Seaport.Order[] = []
        cursor = response.data.next
        const values: any[] = []

        const handleOrder = async (order: SeaportOrder) => {
          const parsed = await seaport.parseSeaportOrder(order)

          if (parsed) {
            parsedOrders.push(parsed)
          }

          values.push({
            hash: order.order_hash.toLowerCase(),
            target:
              parsed?.getInfo()?.contract.toLowerCase() ||
              order.protocol_data.parameters.offer[0].token.toLowerCase(),
            maker: order.maker.address.toLowerCase(),
            created_at: new Date(order.created_date),
            data: order as any, // or protocol_data
            source: 'opensea',
          })
        }

        // const plimit = pLimit(20)
        await Promise.all(orders.map(order => handleOrder(order)))

        if (values.length) {
          // insert to database
          const query = values.map(value =>
            this.prisma.relayOrder.upsert({
              where: {
                hash: value.hash,
              },
              update: {},
              create: {
                hash: value.hash,
                target: value.target,
                maker: value.maker,
                data: value.data,
                source: value.source,
              },
            }),
          )

          const result = await this.prisma.$transaction([...query])

          // console.log({
          //   result,
          // })

          // empty result if all transactions already exist,
          // return most recent order hash
        }

        // if backfill, log result length
        // if parsedOrders exist, addToRelayOrdersQueue

        // wait to avoid rate-limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.log(error)
      }
    }

    this.logger.log('Sync completed')
  }
}
