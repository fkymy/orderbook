import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { EditUserDto } from './dto'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOkResponse()
  @ApiOperation({ summary: 'test summary here' })
  me(@GetUser() user: User, @GetUser('email') email: string) {
    console.log({
      email: email,
    })

    return user
  }

  @Patch()
  @ApiOkResponse()
  @ApiOperation({ summary: 'test summary here' })
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto)
  }
}
