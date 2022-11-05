import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, Interval, CronExpression, Timeout } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  @Cron('42 * * * * *', {
    name: 'test-cron',
  })
  handleCron() {
    this.logger.debug('Called when the current second is 42')
  }

  @Interval('test-interval', 10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds')
  }

  @Timeout('test-timeout', 5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds')
  }
}
