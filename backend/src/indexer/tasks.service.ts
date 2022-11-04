import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  @Cron('0 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 0')
  }
}
