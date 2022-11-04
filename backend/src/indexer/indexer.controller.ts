import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CreateIndexerDto } from './dto/create-indexer.dto'
import { UpdateIndexerDto } from './dto/update-indexer.dto'
import { IndexerService } from './indexer.service'

@Controller('indexer')
export class IndexerController {
  constructor(private readonly indexerService: IndexerService) {}

  @Get('test-relayer')
  testRelayer() {
    return this.indexerService.testRelayer()
  }
}
