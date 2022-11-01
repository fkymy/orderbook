import { Injectable } from '@nestjs/common'
import { CreateDemoDto } from './dto/create-demo.dto'
import { UpdateDemoDto } from './dto/update-demo.dto'

@Injectable()
export class DemoService {
  create(createDemoDto: CreateDemoDto) {
    return 'This action adds a new demo'
  }

  findAll() {
    return `This action returns all demo`
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`
  }

  remove(id: number) {
    return `This action removes a #${id} demo`
  }
}
