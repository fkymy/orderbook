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
import { LooksRare, LooksRareOrder } from './looksrare'

@Processor('sync-looksrare')
export class SyncProcessor {
  private readonly logger = new Logger(SyncProcessor.name)

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private marketpalceService: MarketplaceService,
    private orderService: OrderService,
  ) {}

  @Process('test')
  async handleSyncTest(job: Job) {
    this.logger.log('Handling test in sync-looksrare queue')
    this.logger.log(job.data)

    const marketplaceId = job.data.marketplaceId
    const marketplace = await this.marketpalceService.findOne(marketplaceId)
    if (!marketplace) {
      throw new NotFoundException('Marketplace not found')
    }
    if (marketplace.contracts.length < 0) {
      throw new NotFoundException('Marketplace does not have contracts')
    }

    const addresses: string[] = []
    for (let i = 0; i < marketplace.contracts.length; i++) {
      const contract = marketplace.contracts[i].contract
      addresses.push(contract.address)
    }

    this.logger.log('Calling looksrare API for marketplace...')
    console.log({
      marketplace,
      addresses,
    })

    for (let i = 0; i < addresses.length; i++) {
      const looksRare = new LooksRare()
      const url = looksRare.buildFetchOrdersUrl({
        collection: addresses[i],
        startTime: 0,
        endTime: 0,
      })
      try {
        const response = await axios.get(url, {
          timeout: 10000,
        })
        console.log({
          responseData: response.data.data,
        })
        const orders: LooksRareOrder[] = response.data.data
        const parsedOrders: Sdk.LooksRare.Order[] = []

        const values: any[] = []

        const handleOrder = async (order: LooksRareOrder) => {
          const orderTarget = order.collectionAddress
          const parsed = await looksRare.parseLooksRareOrder(order)

          if (parsed) {
            parsedOrders.push(parsed)
          }

          values.push({
            hash: order.hash,
            target: orderTarget.toLowerCase(),
            maker: order.signer,
            created_at: new Date(Number(order.startTime)),
            data: order as any,
            source: 'looksrare',
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

          console.log({
            result,
          })

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
