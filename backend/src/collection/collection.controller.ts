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
