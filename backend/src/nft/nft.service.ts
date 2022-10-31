import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, getClient } from '@reservoir0x/reservoir-kit-client'
import { Network, Alchemy } from 'alchemy-sdk'
import axios from 'axios'
import { PrismaService } from 'src/prisma/prisma.service'
import { NftQueryDto } from './dto'
import { CreateNftDto } from './dto/create-nft.dto'
import { UpdateNftDto } from './dto/update-nft.dto'

const testCollectionAddress = '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741'

@Injectable()
export class NftService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  // getNftsForMarketplace(nftQuery: NftQueryDto) {
  //   return 'get nft'
  // }

  getNftsForMarketplace(
    marketplaceId: number,
    contractAddress: string,
    withMetadata: boolean,
    limit: number,
  ) {
    console.log({
      marketplaceId,
      contractAddress,
      withMetadata,
      limit,
    })

    return 'get NFTs'
  }
  findAll() {
    return `This action returns all nft`
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`
  }
}
