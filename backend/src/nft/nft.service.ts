import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Prisma } from '@prisma/client'
import { createClient, getClient } from '@reservoir0x/reservoir-kit-client'
import { Network, Alchemy, Nft } from 'alchemy-sdk'
import axios from 'axios'
import { find } from 'rxjs'
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
    private marketplaceService: MarketplaceService,
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
    const marketplace = await this.marketplaceService.findOne(marketplaceId)
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

    // Parallel
    await Promise.all(
      addresses.map(async address => {
        // console.log(`Fetching address ${address}!`)
        const nfts = await alchemy.nft.getNftsForContract(address, {
          pageSize: 100,
          omitMetadata: false,
        })
        for (const nft of nfts.nfts) {
          res.push(nft)
        }
      }),
    )

    // Sequential
    // for (let i = 0; i < addresses.length; i++) {
    //   console.log(`Fetching address ${addresses[i]}!`)
    //   const nfts = await alchemy.nft.getNftsForContract(addresses[i], {
    //     pageSize: 100,
    //     omitMetadata: false,
    //   })
    //   for (const nft of nfts.nfts) {
    //     res.push(nft)
    //   }
    // }

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
    const res: any = {}

    const settings = {
      apiKey: this.config.get('ALCHEMY_API_KEY'),
      network: Network.ETH_GOERLI,
    }
    const alchemy = new Alchemy(settings)

    // console.log('getNftMetadata')
    // const nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId)
    // res = nft
    //
    // console.log('getOwnersForNft')
    // const owners = await alchemy.nft.getOwnersForNft(contractAddress, tokenId)
    // res.owners = owners.owners
    //
    // console.log('getOrdersForNft')
    // const orders = await this.orderService.getOrdersForNft(
    //   contractAddress,
    //   tokenId,
    // )
    // res.orders = orders.orders
    //
    // console.log('findOneNativeListings')
    // const nativeOrder = await this.orderService.findOneNativeListings(
    //   contractAddress,
    //   tokenId,
    // )
    // res.nativeOrders = [nativeOrder]

    const getNftMetadata = async () => {
      console.log('getNftMetadata')
      const nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId)
      res.nft = nft
    }

    const getOwnersForNft = async () => {
      console.log('getOwnersForNft')
      const owners = await alchemy.nft.getOwnersForNft(contractAddress, tokenId)
      res.owners = owners.owners
    }

    const getOrdersForNft = async () => {
      console.log('getOrdersForNft')
      const orders = await this.orderService.getOrdersForNft(
        contractAddress,
        tokenId,
      )
      res.orders = orders.orders
    }

    const findOneNativeListings = async () => {
      console.log('findOneNativeListings')
      const nativeOrder = await this.orderService.findOneNativeListings(
        contractAddress,
        tokenId,
      )
      res.nativeOrders = [nativeOrder]
    }

    const findRelayedOrders = async () => {
      console.log('findRelayedOrders')
      const relayedOrders = await this.orderService.findRelayedOrders()
      for (let i = 0; i < relayedOrders.length; i++) {
        if (
          relayedOrders[i].data &&
          typeof relayedOrders[i].data === 'object'
        ) {
          const object = relayedOrders[i].data as Prisma.JsonObject
          // console.log({ object })
          // console.log(contractAddress)
          // console.log(object.collectionAddress)
          // console.log(object.tokenId)
          // console.log(tokenId.toString())
          if (
            (object.collectionAddress as string).toUpperCase() ===
              contractAddress.toUpperCase() &&
            object.tokenId === tokenId.toString()
          ) {
            // console.log('MATCHED RELAYED ORDER!!!')
            if (res.relayedOrders) {
              res.relayedOrders.push(object)
            } else {
              res.relayedOrders = [object]
            }
          } else {
            // console.log('NOT MATCHED')
          }
        }
        // if (
        //   relayedOrders[i].data &&
        //   relayedOrders[i].data.collectionAddress === contractAddress &&
        //   relayedOrders[i].data.tokenId === tokenId.toString()
        // ) {
        //   res.relayedOrders = relayedOrders
        // }
      }
    }

    const promises = [
      getNftMetadata(),
      getOwnersForNft(),
      getOrdersForNft(),
      findOneNativeListings(),
      findRelayedOrders(),
    ]

    await Promise.all(promises)

    // functions.reduce((p, fn) => p.then(fn), Promise.resolve())

    return res
  }

  findAll() {
    return `This action returns all nft`
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`
  }
}
