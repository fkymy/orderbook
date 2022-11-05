import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('sync-looksrare')
export class SyncProcessor {
  private readonly logger = new Logger(SyncProcessor.name)

  @Process('test')
  handleSyncTest(job: Job<unknown>) {
    this.logger.log('Calling looksrare API...')
    this.logger.log(job.data)
    this.logger.log('Sync completed')
  }
}
