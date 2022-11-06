import { PartialType } from '@nestjs/swagger'
import { CreateIndexerDto } from './create-indexer.dto'

export class UpdateIndexerDto extends PartialType(CreateIndexerDto) {}
