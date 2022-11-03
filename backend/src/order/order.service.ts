import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Marketplace } from '@prisma/client'
import { Network, Alchemy, Nft } from 'alchemy-sdk'
import axios from 'axios'
import { add } from 'pactum/src/exports/reporter'
import { PrismaService } from 'src/prisma/prisma.service'
import { BuyListingDto } from './dto/buy-listing.dto'
import { CreateListingDto } from './dto/create-listing.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

const testCollectionAddress = '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741'
const testYugidamaAddress = '0x24e5bba6218d711ee675a844fc237f1ebfe83fe9'
const testApiKey = 'demo-api-key'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async findAllNativeListings() {
    const orders = this.prisma.order.findMany({
      where: {
        kind: 'orderbook',
        side: 'ASK',
        status: 'ACTIVE',
        finalized: false,
      },
    })
    return orders
  }

  async findOneNativeListings(contractAddress: string, tokenId: number) {
    const order = this.prisma.order.findFirst({
      where: {
        contract: contractAddress,
        tokenId: tokenId,
        kind: 'orderbook',
        side: 'ASK',
        status: 'ACTIVE',
        finalized: false,
      },
    })
    return order
  }

  async createListing(dto: CreateListingDto) {
    console.log({
      dto,
    })

    const data: any = {
      kind: 'orderbook',
      side: 'ASK',
      status: 'ACTIVE',
      cancelled: false,
      finalized: false,
      signature: 'none',
      contract: dto.contract,
      tokenId: dto.tokenId,
      tokenSetId: `token:${dto.contract}:${dto.tokenId}`,
      maker: dto.maker,
      taker: undefined,
      currencyName: 'Ether',
      currencySymbol: 'ETH',
      decimals: 18,
      rawAmount: undefined,
      decimalAmount: dto.decimalAmount,
      isOrderbook: true,
      isReservoir: false,
      source: undefined,
    }

    const createdListing = await this.prisma.order.create({
      data,
    })

    return createdListing
  }

  async buyListing(dto: BuyListingDto) {
    const listing = await this.prisma.order.findUnique({
      where: {
        id: dto.id,
      },
    })
    if (!listing) {
      throw new NotFoundException('listing not found')
    }
    if (listing.status !== 'ACTIVE' || listing.finalized === true) {
      throw new NotFoundException('listing is not active')
    }

    const updateListing = await this.prisma.order.update({
      where: {
        id: dto.id,
      },
      data: {
        status: 'INACTIVE',
        finalized: true,
        taker: dto.taker,
      },
    })
    return updateListing
  }

  async getOrdersForContracts(addresses: string[]) {
    let url = `${this.config.get('ORDERBOOK_BASE_URL')}/orders/asks/v3`
    for (let i = 0; i < addresses.length; i++) {
      const prefix = i === 0 ? '?' : '&'
      url = url + `${prefix}contracts=${addresses[i]}`
    }
    const res = await axios.get(url, {
      params: {
        includePrivate: false,
        includeMetadata: false,
        includeRawData: false,
        sortBy: 'createdAt',
        limit: 100,
      },
      headers: {
        accept: '*/*',
        'x-api-key': this.config.get('ORDERBOOK_API_KEY'),
      },
    })
    console.log(res.data)
    if (res.data.orders) {
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data.orders[i])
      }
    } else {
      console.log('no orders')
    }
    return res.data
  }

  async getOrdersForNft(contractAddress: string, tokenId: number) {
    const prefix = '?'
    const token = `${contractAddress}:${tokenId.toString()}`
    let url = `${this.config.get('ORDERBOOK_BASE_URL')}/orders/asks/v3`
    url = url + `${prefix}token=${token}`
    const res = await axios.get(url, {
      params: {
        includePrivate: false,
        includeMetadata: false,
        includeRawData: false,
        sortBy: 'createdAt',
        limit: 100,
      },
      headers: {
        accept: '*/*',
        'x-api-key': this.config.get('ORDERBOOK_API_KEY'),
      },
    })
    console.log(res)
    console.log(res.data)
    if (res.data.orders) {
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data.orders[i])
      }
    } else {
      console.log('no orders')
    }
    return res.data
  }

  async getSampleOrders() {
    // Get orders
    const orderUrl =
      `${this.config.get('ORDERBOOK_BASE_URL')}/orders/asks/v3` +
      `?contracts=${testYugidamaAddress}`
    const orderRes = await axios.get(orderUrl, {
      params: {
        includePrivate: false,
        includeMetadata: false,
        includeRawData: false,
        sortBy: 'createdAt',
        limit: 50,
      },
      headers: {
        accept: '*/*',
        'x-api-key': this.config.get('ORDERBOOK_API_KEY'),
      },
    })
    console.log(orderRes.data)
    if (orderRes.data.orders) {
      for (let i = 0; i < orderRes.data.length; i++) {
        console.log(orderRes.data.orders[i])
      }
    } else {
      console.log('no orders')
    }
    return orderRes.data

    return {
      orders: [
        {
          id: '0xec4ce3aca71cc9d0f8b1a0560db4463d69589c8917fec2b5452eae126e9c500a',
          kind: 'looks-rare',
          side: 'sell',
          status: 'active',
          tokenSetId: 'token:0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741:1',
          tokenSetSchemaHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          contract: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          maker: '0x96b1bd9e8af7e3a0d840080690ca7e30a7b3c852',
          taker: '0x0000000000000000000000000000000000000000',
          price: {
            currency: {
              contract: '0x0000000000000000000000000000000000000000',
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            amount: {
              raw: '422000000000000000000',
              decimal: 422,
              usd: null,
              native: 422,
            },
            netAmount: {
              raw: '415670000000000000000',
              decimal: 415.67,
              usd: null,
              native: 415.67,
            },
          },
          validFrom: 1667097134,
          validUntil: 1669689124,
          quantityFilled: 0,
          quantityRemaining: 1,
          source: {
            id: '0x5924a28caaf1cc016617874a2f0c3710d881f3c1',
            domain: 'looksrare.org',
            name: 'LooksRare',
            icon: 'https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/looksrare-logo.svg',
            url: 'https://rinkeby.looksrare.org/collections/0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741/1',
          },
          feeBps: 150,
          feeBreakdown: [
            {
              bps: 150,
              kind: 'marketplace',
              recipient: '0x5924a28caaf1cc016617874a2f0c3710d881f3c1',
            },
          ],
          expiration: 1669689124,
          isReservoir: null,
          isDynamic: false,
          createdAt: '2022-10-30T02:32:22.218Z',
          updatedAt: '2022-10-30T02:32:22.218Z',
        },
        {
          id: '0x866752235133d887c2aca93a082af5f74dd9c0849ea82f9e7e93920eebb8c97b',
          kind: 'seaport',
          side: 'sell',
          status: 'active',
          tokenSetId: 'token:0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741:0',
          tokenSetSchemaHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          contract: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          maker: '0x96b1bd9e8af7e3a0d840080690ca7e30a7b3c852',
          taker: '0x0000000000000000000000000000000000000000',
          price: {
            currency: {
              contract: '0x0000000000000000000000000000000000000000',
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            amount: {
              raw: '42000000000000000',
              decimal: 0.042,
              usd: null,
              native: 0.042,
            },
            netAmount: {
              raw: '40950000000000000',
              decimal: 0.04095,
              usd: null,
              native: 0.04095,
            },
          },
          validFrom: 1667096939,
          validUntil: 1669775339,
          quantityFilled: 0,
          quantityRemaining: 1,
          source: {
            id: '0xca0e98ce2e85641beb7c30352121fa2cc14761e1',
            domain: 'opensea.io',
            name: 'OpenSea',
            icon: 'https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/opensea-logo.svg',
            url: 'https://testnets.opensea.io/assets/goerli/0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741/0',
          },
          feeBps: 250,
          feeBreakdown: [
            {
              bps: 250,
              kind: 'marketplace',
              recipient: '0x0000a26b00c1f0df003000390027140000faa719',
            },
          ],
          expiration: 1669775339,
          isReservoir: null,
          isDynamic: false,
          createdAt: '2022-10-30T02:31:30.124Z',
          updatedAt: '2022-10-30T02:31:30.124Z',
        },
        {
          id: '0x994313d1b550e80355a14f8e11d0a77707625994b8aa3087fc76645b04b7a190',
          kind: 'looks-rare',
          side: 'sell',
          status: 'active',
          tokenSetId: 'token:0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741:4',
          tokenSetSchemaHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          contract: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          maker: '0x96b1bd9e8af7e3a0d840080690ca7e30a7b3c852',
          taker: '0x0000000000000000000000000000000000000000',
          price: {
            currency: {
              contract: '0x0000000000000000000000000000000000000000',
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            amount: {
              raw: '42000000000000000000',
              decimal: 42,
              usd: null,
              native: 42,
            },
            netAmount: {
              raw: '41370000000000000000',
              decimal: 41.37,
              usd: null,
              native: 41.37,
            },
          },
          validFrom: 1667095356,
          validUntil: 1669687288,
          quantityFilled: 0,
          quantityRemaining: 1,
          source: {
            id: '0x5924a28caaf1cc016617874a2f0c3710d881f3c1',
            domain: 'looksrare.org',
            name: 'LooksRare',
            icon: 'https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/looksrare-logo.svg',
            url: 'https://rinkeby.looksrare.org/collections/0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741/4',
          },
          feeBps: 150,
          feeBreakdown: [
            {
              bps: 150,
              kind: 'marketplace',
              recipient: '0x5924a28caaf1cc016617874a2f0c3710d881f3c1',
            },
          ],
          expiration: 1669687288,
          isReservoir: null,
          isDynamic: false,
          createdAt: '2022-10-30T02:02:46.723Z',
          updatedAt: '2022-10-30T02:02:46.723Z',
        },
        {
          id: '0x80579795d7462c92b29b618c87762e7fa9426325474a821e47d107a237253ffc',
          kind: 'seaport',
          side: 'sell',
          status: 'active',
          tokenSetId: 'token:0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741:4',
          tokenSetSchemaHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          contract: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          maker: '0x96b1bd9e8af7e3a0d840080690ca7e30a7b3c852',
          taker: '0x0000000000000000000000000000000000000000',
          price: {
            currency: {
              contract: '0x0000000000000000000000000000000000000000',
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            amount: {
              raw: '420000000000000000',
              decimal: 0.42,
              usd: null,
              native: 0.42,
            },
            netAmount: {
              raw: '409500000000000000',
              decimal: 0.4095,
              usd: null,
              native: 0.4095,
            },
          },
          validFrom: 1667074538,
          validUntil: 1669752938,
          quantityFilled: 0,
          quantityRemaining: 1,
          source: {
            id: '0xca0e98ce2e85641beb7c30352121fa2cc14761e1',
            domain: 'opensea.io',
            name: 'OpenSea',
            icon: 'https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/opensea-logo.svg',
            url: 'https://testnets.opensea.io/assets/goerli/0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741/4',
          },
          feeBps: 250,
          feeBreakdown: [
            {
              bps: 250,
              kind: 'marketplace',
              recipient: '0x0000a26b00c1f0df003000390027140000faa719',
            },
          ],
          expiration: 1669752938,
          isReservoir: null,
          isDynamic: false,
          createdAt: '2022-10-29T20:21:17.375Z',
          updatedAt: '2022-10-29T20:21:17.375Z',
        },
      ],
      continuation: null,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order'
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`
  }

  remove(id: number) {
    return `This action removes a #${id} order`
  }
}
