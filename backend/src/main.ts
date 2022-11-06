import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { BaseAdapter } from '@bull-board/api/dist/src/queueAdapters/base'
import { ExpressAdapter } from '@bull-board/express'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Queue } from 'bull'
import express from 'express'
import { AppModule } from './app.module'
import { getBullBoardQueues } from './bull-board-queue'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Orderbook')
    .setDescription('Orderbook API description')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/queues')
  const queues = getBullBoardQueues()
  const allQueues: Queue[] = []
  const router = serverAdapter.getRouter() as express.Express

  const { addQueue } = createBullBoard({
    // queues: allQueues.map(q => new BullAdapter(q)),
    queues: [],
    serverAdapter,
  })

  queues.forEach((q: BaseAdapter) => {
    addQueue(q)
  })

  app.use('/queues', serverAdapter.getRouter())

  await app.listen(3001)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
