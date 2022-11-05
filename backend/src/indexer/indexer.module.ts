import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { BullBoardModule } from 'src/bull-board.module'
import { IndexerController } from './indexer.controller'
import { IndexerService } from './indexer.service'
import { SyncProcessor } from './sync.processor'
import { TasksService } from './tasks.service'
import { TestProcessor } from './test.processor'

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'test-queue',
      },
      {
        name: 'sync-looksrare',
      },
      {
        name: 'file-operation-queue',
      },
    ),
  ],
  controllers: [IndexerController],
  providers: [IndexerService, TasksService, TestProcessor, SyncProcessor],
})
export class IndexerModule {}
