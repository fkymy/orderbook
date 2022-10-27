import { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as pactum from 'pactum'
import * as request from 'supertest'

import { AppModule } from './../src/app.module'
import { AuthDto } from './../src/auth/dto'
import { PrismaService } from './../src/prisma/prisma.service'

describe('App (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    await app.init()
    await app.listen(3002)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
  })

  afterAll(async () => {
    if (app) {
      await app.close()
    }
  })

  describe('auth', () => {
    describe('signup', () => {
      it('should signup', () => {
        const dto: AuthDto = {
          email: 'test@example.com',
          password: 'Test123!',
        }
        return pactum
          .spec()
          .post('http://localhost:3002/auth/signup')
          .withBody(dto)
          .expectStatus(201)
      })
    })

    describe('signin', () => {
      it.todo('should signin')
    })
  })

  describe('user', () => {
    describe('get me', () => {
      it.todo('should get me')
    })
  })

  describe('bookmark', () => {
    describe('create bookmarks', () => {})
    describe('get bookmarks', () => {})
    describe('get bookmark by id', () => {})
    describe('edit bookmark', () => {})
    describe('delete bookmark', () => {})
  })
})
