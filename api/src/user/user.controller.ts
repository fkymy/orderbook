import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'

import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'

import { EditUserDto } from './dto'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  me(@GetUser() user: User, @GetUser('email') email: string) {
    console.log({
      email: email,
    })

    return user
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto)
  }
}
