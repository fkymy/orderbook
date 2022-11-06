import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import * as Sdk from '@reservoir0x/sdk'
import { Network, Alchemy } from 'alchemy-sdk'
import axios from 'axios'
import { Queue } from 'bull'
import { CronJob } from 'cron'
import pLimit from 'p-limit'
import { logger } from 'src/logger'
import { PrismaService } from 'src/prisma/prisma.service'
import { MarketplaceService } from '../marketplace/marketplace.service'
import { CreateIndexerDto } from './dto/create-indexer.dto'
import { UpdateIndexerDto } from './dto/update-indexer.dto'
import { LooksRare, LooksRareOrder } from './looksrare'

@Injectable()
export class IndexerService {
  private readonly logger = new Logger(IndexerService.name)
  private readonly testApiKey = 'demo-api-key'
  private readonly testCollectionAddress =
    '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741'

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private marketplaceService: MarketplaceService,
    private schedulerRegistry: SchedulerRegistry,
    @InjectQueue('sync-seaport') private syncSeaportQueue: Queue,
    @InjectQueue('sync-looksrare') private syncLooksrareQueue: Queue,
  ) {}

  async syncMarketplace(marketplaceId: number) {
    // Get marketplace by id
    const marketplace = await this.marketplaceService.findOne(marketplaceId)
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

    // Get NFTs
    this.logger.warn('Get NFTs')

    const seaportJob = new CronJob(`*/5 * * * * *`, async () => {
      this.logger.log('fetch_orders_seaport')
      // add to seaport queue
      await this.syncSeaportQueue.add('fetch-orders', {
        addresses,
      })
    })

    this.schedulerRegistry.addCronJob('seaport-job', seaportJob)
    seaportJob.start()
    this.logger.warn('Sync seaport orders')

    return 'only seaport'
    const looksRareJob = new CronJob(`*/5 * * * * *`, async () => {
      this.logger.log('fetch_orders_looksrare')
      // add to looksrare queue
      await this.syncLooksrareQueue.add('fetch-orders', {
        // marketplaceId: marketplaceId,
        addresses,
      })
    })

    this.schedulerRegistry.addCronJob('looksrare-job', looksRareJob)
    looksRareJob.start()
    this.logger.warn('Sync looksrare orders')
  }

  pause(name: string) {
    this.schedulerRegistry.deleteCronJob(name)
    this.logger.warn(`job ${name} was deleted`)
  }

  testTasks() {
    const job = this.schedulerRegistry.getCronJob('test-cron')
    job.stop()
    console.log(job.lastDate())
  }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`)
    })

    this.schedulerRegistry.addCronJob(name, job)
    job.start()

    this.logger.warn(`job ${name} added for each minute at ${seconds} seconds!`)
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name)
    this.logger.warn(`job ${name} was deleted`)
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs()
    jobs.forEach((value, key, map) => {
      let next: any
      try {
        next = value.nextDates().toJSDate()
      } catch (e) {
        next = 'error: next fire date is in the past'
      }
      this.logger.log(`job: ${key} -> next: ${next}`)
    })
  }

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
