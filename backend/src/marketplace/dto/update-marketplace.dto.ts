import { PartialType } from '@nestjs/swagger'
import { CreateMarketplaceDto } from './create-marketplace.dto'

export class UpdateMarketplaceDto extends PartialType(CreateMarketplaceDto) {}
