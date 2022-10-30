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
import { CollectionService } from './collection.service'
import { CreateCollectionSetDto } from './dto/create-collection-set.dto'
import { CreateCollectionDto } from './dto/create-collection.dto'
import { UpdateCollectionDto } from './dto/update-collection.dto'

@Controller('collections')
@ApiTags('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  // - Create marketplace
  //   1. Get collection addresses in an array and market fee
  //   2. Fetch collection data and save in database
  //   3. Get all tokens and save in database
  // - Get list of tokens and listings
  //   1. Get all tokens saved in database
  //   2. Fetch listings from reservoir API

  @Post()
  createSet(@Body() createCollectionSetDto: CreateCollectionSetDto) {
    return 'test'
  }

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto)
  }

  @Get()
  findAll() {
    return this.collectionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(+id, updateCollectionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id)
  }
}
