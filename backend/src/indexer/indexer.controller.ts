import { InjectQueue } from '@nestjs/bull'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'
import { Queue } from 'bull'
import { CreateIndexerDto } from './dto/create-indexer.dto'
import { UpdateIndexerDto } from './dto/update-indexer.dto'
import { IndexerService } from './indexer.service'

@Controller('indexer')
export class IndexerController {
  constructor(
    private readonly indexerService: IndexerService,
    @InjectQueue('test-queue') private readonly testQueue: Queue,
    @InjectQueue('file-operation-queue') private fileQueue: Queue,
  ) {}

  @Post('sync')
  async syncMarketplace(
    @Body('marketplaceId', ParseIntPipe) marketplaceId: number,
  ) {
    return this.indexerService.syncMarketplace(marketplaceId)
  }

  @Post('pause/seaport')
  pauseSeaport() {
    return this.indexerService.pause('seaport-job')
  }

  @Post('pause/looksrare')
  pauseLooksRare() {
    return this.indexerService.pause('looksrare-job')
  }

  @Get('test-tasks')
  testTasks() {
    return this.indexerService.testTasks()
  }

  @Get('test-relayer')
  testRelayer() {
    return this.indexerService.testRelayer()
  }

  // producer
  @Post('transcode')
  async transcode() {
    console.log('adding queue...')
    await this.testQueue.add('transcode', {
      file: 'test.mp3',
    })
  }

  @Post('delete-file')
  async deleteFile() {
    const filePath = '/test/file/path'
    await this.fileQueue.add('delete-file', {
      filePath,
    })
  }
}
