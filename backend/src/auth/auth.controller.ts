import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import { AuthResultEntity } from './entities/auth.entity'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ type: AuthResultEntity })
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    })
    return this.authService.signup(dto)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResultEntity })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto)
  }
}
