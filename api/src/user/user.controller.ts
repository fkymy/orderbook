import { Controller, Get, Patch, UseGuards, Req } from '@nestjs/common'
import { Request } from 'express'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  me(@GetUser('id') user: User, @GetUser('email') email: string) {
    console.log({
      email: email,
    })

    return user
  }
}
