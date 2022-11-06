import * as Sdk from '@reservoir0x/sdk'
import { logger } from 'src/logger'
import { query } from 'winston'

type FetchOrdersParams = {
  assetContractAddress: string
  startTokenId: number
  endTokenId: number
  side: 'sell' | 'buy'
  orderBy?: 'created_date'
  orderDirection?: 'asc' | 'desc'
  limit?: number
  cursor?: string | null
  listedBefore?: number | null
  listedAfter?: number | null
}

export type SeaportOrder = {
  created_date: string
  order_hash: string
  maker: {
    address: string
  }
  protocol_address: string
  protocol_data: {
    parameters: {
      offerer: string
      zone: string
      zoneHash: string
      conduitKey: string
      salt: string
      consideration: Sdk.Seaport.Types.ConsiderationItem[]
      offer: Sdk.Seaport.Types.OfferItem[]
      counter: number
      orderType: number
      startTime: number
      endTime: number
    }
    signature: string
  }
  client_signature: string
}

export class Seaport {
  public buildFetchOrdersUrl(params: FetchOrdersParams) {
    let hostname = 'api.opensea.io'
    let network = 'ethereum'
    switch (Number(process.env.CHAIN_ID)) {
      case 1:
        break

      case 4:
      case 5:
        hostname = 'testnets-api.opensea.io'
        network = 'goerli'
        break

      case 137:
        network = 'matic'
        break

      default:
        throw new Error('Unsupported chain')
    }

    const baseApiUrl = `https://${hostname}/v2/orders/${network}/seaport/${
      params.side === 'sell' ? 'listings' : 'offers'
    }`

    const queryParams = new URLSearchParams()

    if (params.assetContractAddress) {
      queryParams.append(
        'asset_contract_address',
        String(params.assetContractAddress),
      )
    }

    if (
      typeof params.startTokenId === 'number' &&
      typeof params.endTokenId === 'number' &&
      params.startTokenId <= params.endTokenId
    ) {
      for (let i = params.startTokenId; i < params.endTokenId; i++) {
        queryParams.append('token_ids', String(i))
      }
    }
    //
    // if (typeof params.endTokenId === 'number') {
    //   queryParams.append('token_ids', String(params.endTokenId))
    // }

    if (params.orderBy) {
      queryParams.append('order_by', String(params.orderBy))
    }

    if (params.limit) {
      queryParams.append('limit', String(params.limit))
    }

    if (params.orderDirection) {
      queryParams.append('order_direction', String(params.orderDirection))
    }

    if (params.cursor) {
      queryParams.append('cursor', String(params.cursor))
    }

    if (params.listedBefore) {
      queryParams.append('listed_before', String(params.listedBefore))
    }

    if (params.listedAfter) {
      queryParams.append('listed_after', String(params.listedAfter))
    }

    return decodeURI(`${baseApiUrl}?${queryParams.toString()}`)
  }

  public async parseSeaportOrder(
    seaportOrder: SeaportOrder,
  ): Promise<Sdk.Seaport.Order | undefined> {
    try {
      return new Sdk.Seaport.Order(Number(process.env.CHAIN_ID), {
        endTime: seaportOrder.protocol_data.parameters.endTime,
        startTime: seaportOrder.protocol_data.parameters.startTime,
        consideration: seaportOrder.protocol_data.parameters.consideration,
        offer: seaportOrder.protocol_data.parameters.offer,
        conduitKey: seaportOrder.protocol_data.parameters.conduitKey,
        salt: seaportOrder.protocol_data.parameters.salt,
        zone: seaportOrder.protocol_data.parameters.zone,
        zoneHash: seaportOrder.protocol_data.parameters.zoneHash,
        offerer: seaportOrder.protocol_data.parameters.offerer,
        counter: `${seaportOrder.protocol_data.parameters.counter}`,
        orderType: seaportOrder.protocol_data.parameters.orderType,
        signature: seaportOrder.protocol_data.signature,
      })
    } catch (error) {
      // skip any error
      logger.error(
        'parse-seaport-order',
        `Failed to parse order ${seaportOrder.order_hash} - ${error}`,
      )
    }
  }
}
