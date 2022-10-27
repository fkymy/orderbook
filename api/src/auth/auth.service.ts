import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  test() {
    console.log('test')
  }

  signup() {
    return { message: 'signup' }
  }

  signin() {
    return { message: 'signin' }
  }
}
