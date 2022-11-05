import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('test-queue')
@Processor('file-operation-queue')
export class TestProcessor {
  private readonly logger = new Logger(TestProcessor.name)

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...')
    this.logger.debug(job.data)
    this.logger.debug('Transcoding completed')
  }

  @Process('delete-file')
  async handleFileDeletion(job: Job<unknown>) {
    const jobData: any = job.data
    this.logger.debug(`deleted file ${jobData.filePath}`)
  }

  @Process('csvfilljob')
  async processFile(job: Job) {
    // const file = job.data.file
    // const filePath = file.path
    // const userData = await csv().fromFile(filePath)
    //
    // console.log(userData)
    //
    // for (const user of userData) {
    //   const input = {
    //     email: user.email,
    //     first_name: user.first_name,
    //     last_name: user.last_name,
    //   }
    //
    //   const userCreated = await this.userService.createUser(input)
    //   console.log('User created -', userCreated.id)
    // }
  }
}
