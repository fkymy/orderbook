import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { IndexerController } from './indexer.controller'
import { IndexerService } from './indexer.service'
import { TasksService } from './tasks.service'
import { TestProcessor } from './test.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'test-queue',
    }),
  ],
  controllers: [IndexerController],
  providers: [IndexerService, TasksService, TestProcessor],
})
export class IndexerModule {}
