import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, getClient } from '@reservoir0x/reservoir-kit-client'
import { Network, Alchemy, Nft } from 'alchemy-sdk'
import axios from 'axios'
import { OrderService } from 'src/order/order.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { isWholeNumber } from 'src/utils'
import { MarketplaceService } from '../marketplace/marketplace.service'
import { NftQueryDto } from './dto'
import { CreateNftDto } from './dto/create-nft.dto'
import { UpdateNftDto } from './dto/update-nft.dto'

const testCollectionAddress = '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741'
const apiKey = 'dc90c81b-ef38-5355-9d6d-5fa316360197'
const testApiKey = 'demo-api-key'
const testBaseUrl = 'https://api-goerli.reservoir.tools'

type Order = {
  id: string
  kind: string
  side: string
  status: string
  tokenSetId: string
  tokenSetSchemaHash: string
  contract: string
  maker: string
  taker: string
}

@Injectable()
export class NftService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private marketpalceService: MarketplaceService,
    private orderService: OrderService,
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
    // const res: Nft[] = []
    const res: any[] = []

    console.log({
      marketplaceId,
      contractAddress,
      withMetadata,
      limit,
    })

    // Get marketplace by id
    const marketplace = await this.marketpalceService.findOne(marketplaceId)
    if (!marketplace) {
      throw new NotFoundException('Marketplace not found')
    }
    if (marketplace.contracts.length < 0) {
      throw new NotFoundException('Marketplace does not have contracts')
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
    }

    // add orders to nfts
    // Get orders
    const orderRes = this.orderService.getSampleOrders()
    const orders = orderRes.orders
    for (let i = 0; i < orders.length; i++) {
      const split = orders[i].tokenSetId.split(':')
      if (split.length !== 3 || !isWholeNumber(split[2])) {
        throw new InternalServerErrorException('tokenSetId invalid')
      }
      const address = split[1]
      const tokenId = split[2]
      for (let j = 0; j < res.length; j++) {
        if (res[j].contract.address === address && res[j].tokenId === tokenId) {
          if (res[j].orders) {
            res[j].orders.push(orders[i])
          } else {
            res[j].orders = [orders[i]]
          }
        }
      }
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
