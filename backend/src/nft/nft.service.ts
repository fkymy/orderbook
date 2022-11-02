import {
  BadRequestException,
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
import { isWholeNumber, arrayContains } from 'src/utils'
import { MarketplaceService } from '../marketplace/marketplace.service'
import { NftQueryDto } from './dto'
import { CreateNftDto } from './dto/create-nft.dto'
import { UpdateNftDto } from './dto/update-nft.dto'

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
    // nft metadata with orders and nativeOrders
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

    // Optional config object
    const settings = {
      apiKey: this.config.get('ALCHEMY_API_KEY'),
      network: Network.ETH_GOERLI,
    }
    const alchemy = new Alchemy(settings)

    const addresses: string[] = []
    if (contractAddress) {
      // If contract address is given, only list for that address
      let found = false
      for (let i = 0; i < marketplace.contracts.length; i++) {
        const contract = marketplace.contracts[i].contract
        if (contractAddress === contract.address) {
          found = true
        }
      }
      if (!found) {
        throw new NotFoundException('Contract address not found in marketplace')
      }
      addresses.push(contractAddress)
    } else {
      for (let i = 0; i < marketplace.contracts.length; i++) {
        const contract = marketplace.contracts[i].contract
        addresses.push(contract.address)
      }
    }

    // Loop through addresses and list nft data
    for (let i = 0; i < addresses.length; i++) {
      const nfts = await alchemy.nft.getNftsForContract(addresses[i], {
        pageSize: 100,
        omitMetadata: false,
      })
      for (const nft of nfts.nfts) {
        res.push(nft)
      }
    }

    // Add aggregaed orders to response
    const data = await this.orderService.getOrdersForContracts(addresses)
    const orders = data.orders
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

    // Add native orders to nfts
    const nativeOrders = await this.orderService.findAllNativeListings()
    for (let i = 0; i < nativeOrders.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (
          res[j].contract.address === nativeOrders[i].contract &&
          res[j].tokenId === nativeOrders[i].tokenId.toString()
        ) {
          if (res[j].nativeOrders) {
            res[j].nativeOrders.push(nativeOrders[i])
          } else {
            res[j].nativeOrders = [nativeOrders[i]]
          }
        }
      }
    }

    return res
  }

  async getNft(contractAddress: string, tokenId: number) {
    // nft metadata with orders and nativeOrders and owners
    let res: any = {}

    const settings = {
      apiKey: this.config.get('ALCHEMY_API_KEY'),
      network: Network.ETH_GOERLI,
    }
    const alchemy = new Alchemy(settings)

    const nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId)
    console.log(nft)
    res = nft

    const owners = await alchemy.nft.getOwnersForNft(contractAddress, tokenId)
    res.owners = owners.owners

    const orders = await this.orderService.getOrdersForNft(
      contractAddress,
      tokenId,
    )
    res.orders = orders.orders

    const nativeOrder = await this.orderService.findOneNativeListings(
      contractAddress,
      tokenId,
    )
    res.nativeOrders = [nativeOrder]
    return res
  }

  findAll() {
    return `This action returns all nft`
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`
  }
}
