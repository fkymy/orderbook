import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { BaseAdapter } from '@bull-board/api/dist/src/queueAdapters/base'
import { ExpressAdapter } from '@bull-board/express'
import { BullModule, getQueueToken } from '@nestjs/bull'
import {
  Global,
  Module,
  NestModule,
  Inject,
  MiddlewareConsumer,
} from '@nestjs/common'
import Bull, { Queue } from 'bull'

@Global()
@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'test-queue',
      },
      {
        name: 'sync-looksrare',
      },
    ),
  ],
})
export class BullBoardModule implements NestModule {
  @Inject(getQueueToken('test-queue'))
  private readonly testQueue: Queue
  @Inject(getQueueToken('sync-looksrare'))
  private readonly syncLooksrareQueue: Queue

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter()
    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard(
      {
        queues: [
          new BullAdapter(this.testQueue),
          new BullAdapter(this.syncLooksrareQueue),
        ],
        serverAdapter,
      },
    )
    serverAdapter.setBasePath('/admin/queues')
    consumer.apply(serverAdapter.getRouter()).forRoutes('/admin/queues')
  }
}
