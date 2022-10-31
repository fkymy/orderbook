import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrderService {
  getSampleOrders() {
    // Get orders
    // const orderUrl =
    //   `${testBaseUrl}/orders/asks/v3` + `?contracts=${contract.address}`
    // const orderRes = await axios.get(orderUrl, {
    //   params: {
    //     includePrivate: false,
    //     includeMetadata: false,
    //     includeRawData: false,
    //     sortBy: 'createdAt',
    //     limit: 50,
    //   },
    //   headers: {
    //     accept: '*/*',
    //     'x-api-key': apiKey,
    //   },
    // })
    // console.log(orderRes.data)
    // if (orderRes.data.orders) {
    //   for (let i = 0; i < orderRes.data.length; i++) {
    //     console.log(orderRes.data.orders[i])
    //   }
    // } else {
    //   console.log('no orders')
    // }

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
          price: [Object],
          validFrom: 1667097134,
          validUntil: 1669689124,
          quantityFilled: 0,
          quantityRemaining: 1,
          source: [Object],
          feeBps: 150,
          feeBreakdown: [Array],
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
          price: [Object],
          validFrom: 1667096939,
          validUntil: 1669775339,
          quantityFilled: 0,
          quantityRemaining: 1,
          source: [Object],
          feeBps: 250,
          feeBreakdown: [Array],
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
          price: [Object],
          validFrom: 1667095356,
          validUntil: 1669687288,
          quantityFilled: 0,
          quantityRemaining: 1,
          source: [Object],
          feeBps: 150,
          feeBreakdown: [Array],
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
          price: [Object],
          validFrom: 1667074538,
          validUntil: 1669752938,
          quantityFilled: 0,
          quantityRemaining: 1,
          source: [Object],
          feeBps: 250,
          feeBreakdown: [Array],
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

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order'
  }

  findAll() {
    return `This action returns all order`
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`
  }

  remove(id: number) {
    return `This action removes a #${id} order`
  }
}
