import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import * as Sdk from '@reservoir0x/sdk'
import { Network, Alchemy } from 'alchemy-sdk'
import axios from 'axios'
import pLimit from 'p-limit'
import { logger } from 'src/logger'
import { LooksRare, LooksRareOrder } from 'src/looksrare'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateIndexerDto } from './dto/create-indexer.dto'
import { UpdateIndexerDto } from './dto/update-indexer.dto'

@Injectable()
export class IndexerService {
  testApiKey = 'demo-api-key'
  testCollectionAddress = '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741'

  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async testRelayer() {
    const looksRare = new LooksRare()

    const url = looksRare.buildFetchOrdersUrl({ startTime: 0, endTime: 0 })

    try {
      const response = await axios.get(url, {
        timeout: 10000,
      })
      console.log(response.data.data)
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
      console.log({
        parsedOrders,
      })

      if (values.length) {
        // insert to database
        // empty result if all transactions already exist,
        // return most recent order hash
      }

      // if backfill, log result length
      // if parsedOrders exist, addToRelayOrdersQueue

      // wait to avoid rate-limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
      return parsedOrders
    } catch (error) {
      console.log(error)
    }

    return url
  }

  async fetchOrders(
    lastSyncedHash = '',
    cursor = '',
    startTime = 0,
    endTime = 0,
    backfill = false,
  ) {
    logger.info('fetch_orders_looksrare', 'test Fetching orders from LooksRare')

    return ['', '']
  }

  create(createIndexerDto: CreateIndexerDto) {
    return 'This action adds a new indexer'
  }

  findAll() {
    return `This action returns all indexer`
  }

  findOne(id: number) {
    return `This action returns a #${id} indexer`
  }

  update(id: number, updateIndexerDto: UpdateIndexerDto) {
    return `This action updates a #${id} indexer`
  }

  remove(id: number) {
    return `This action removes a #${id} indexer`
  }
}
