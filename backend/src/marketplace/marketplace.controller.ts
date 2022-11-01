import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { CreateMarketplaceDto } from './dto/create-marketplace.dto'
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto'
import { MarketplaceService } from './marketplace.service'

@Controller('marketplaces')
@ApiTags('marketplaces')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create marketplaces with contracts' })
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
