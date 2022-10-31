import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CreateMarketplaceDto } from './dto/create-marketplace.dto'
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto'
import { MarketplaceService } from './marketplace.service'

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  // - Create marketplace
  //   1. Get collection addresses in an array and market fee
  //   2. Fetch collection data and save in database
  //   3. Get all tokens and save in database
  // - Get list of tokens and listings
  //   1. Get all tokens saved in database
  //   2. Fetch listings from reservoir API

  @Post()
  create(@Body() createMarketplaceDto: CreateMarketplaceDto) {
    return this.marketplaceService.create(createMarketplaceDto)
  }

  @Get()
  findAll() {
    return this.marketplaceService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketplaceService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarketplaceDto: UpdateMarketplaceDto,
  ) {
    return this.marketplaceService.update(+id, updateMarketplaceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketplaceService.remove(+id)
  }
}
