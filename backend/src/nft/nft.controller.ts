import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { Request } from 'express'
import { NftQueryDto } from './dto'
import { NftService } from './nft.service'

@Controller('nft')
@ApiTags('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  // Query
  // marketplace=id
  // contractAddress=address
  // withMetadata=false
  // limit=100

  @Get()
  @ApiOperation({ summary: 'Get a list of NFTs for a marketplace' })
  @ApiQuery({ name: 'marketplace', required: false, type: Number })
  @ApiQuery({ name: 'contractAddress', required: false, type: String })
  @ApiQuery({ name: 'withMetadata', required: false, type: Boolean })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getNftsForMarketplace(
    @Query('marketplace') marketplaceId: number,
    @Query('contractAddress') contractAddress: string,
    @Query('withMetadata') withMetadata: boolean,
    @Query('limit') limit: number,
  ) {
    return this.nftService.getNftsForMarketplace(
      marketplaceId,
      contractAddress,
      withMetadata,
      limit,
    )
  }

  // @Get()
  // @ApiOperation({ summary: 'Get a list of NFTs for a marketplace' })
  // getNftsForMarketplace(@Query() nftQuery: NftQueryDto) {
  //   return this.nftService.getNftsForMarketplace(nftQuery)
  // }

  findAll() {
    return this.nftService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nftService.findOne(+id)
  }
}
