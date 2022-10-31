import { Injectable } from '@nestjs/common'
import { CreateMarketplaceDto } from './dto/create-marketplace.dto'
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto'

@Injectable()
export class MarketplaceService {
  create(createMarketplaceDto: CreateMarketplaceDto) {
    return 'This action adds a new marketplace'
  }

  findAll() {
    return `This action returns all marketplace`
  }

  findOne(id: number) {
    return `This action returns a #${id} marketplace`
  }

  update(id: number, updateMarketplaceDto: UpdateMarketplaceDto) {
    return `This action updates a #${id} marketplace`
  }

  remove(id: number) {
    return `This action removes a #${id} marketplace`
  }
}
