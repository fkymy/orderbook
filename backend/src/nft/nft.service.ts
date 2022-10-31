import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, getClient } from '@reservoir0x/reservoir-kit-client'
import { Network, Alchemy, Nft } from 'alchemy-sdk'
import axios from 'axios'
import { PrismaService } from 'src/prisma/prisma.service'
import { MarketplaceService } from '../marketplace/marketplace.service'
import { NftQueryDto } from './dto'
import { CreateNftDto } from './dto/create-nft.dto'
import { UpdateNftDto } from './dto/update-nft.dto'

const testCollectionAddress = '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741'

@Injectable()
export class NftService {
  constructor(
    private prisma: PrismaService,
    private marketpalceService: MarketplaceService,
    private config: ConfigService,
  ) {}
  // getNftsForMarketplace(nftQuery: NftQueryDto) {
  //   return 'get nft'
  // }

  async getNftsForMarketplace(
    marketplaceId: number,
    contractAddress: string,
    withMetadata: boolean,
    limit: number,
  ) {
    const res: Nft[] = []

    console.log({
      marketplaceId,
      contractAddress,
      withMetadata,
      limit,
    })

    // Get marketplace by id
    const marketplace = await this.marketpalceService.findOne(marketplaceId)
    if (!marketplace) {
      throw new NotFoundException()
    }
    if (marketplace.contracts.length < 0) {
      throw new InternalServerErrorException()
    }

    console.log({
      marketplace,
    })

    // Optional config object
    const settings = {
      apiKey: this.config.get('ALCHEMY_API_KEY'),
      network: Network.ETH_GOERLI,
    }
    const alchemy = new Alchemy(settings)

    // Loop through contracts and get nft data
    for (let i = 0; i < marketplace.contracts.length; i++) {
      const contract = marketplace.contracts[i].contract
      console.log(contract)
      const nfts = await alchemy.nft.getNftsForContract(contract.address, {
        pageSize: 100,
        omitMetadata: false,
      })

      for (const nft of nfts.nfts) {
        // console.log('===')
        // console.log({
        //   nft,
        // })
        res.push(nft)
      }
      // console.log('===')

      // Get orders
    }

    return res
  }
  findAll() {
    return `This action returns all nft`
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`
  }
}
