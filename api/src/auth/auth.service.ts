import { Injectable } from '@nestjs/common'

@Injectable({})
export class AuthService {
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
