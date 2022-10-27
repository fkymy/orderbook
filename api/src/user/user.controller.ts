import { Controller, Get, Patch, UseGuards, Req } from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'

import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'

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
