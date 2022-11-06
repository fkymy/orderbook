import * as Sdk from '@reservoir0x/sdk'

type FetchOrdersParams = {
  collection?: string
  startTime?: number
  endTime?: number
}

type FetchOrdersPaginationParams = {
  limit: number
  cursor: string
}

export type LooksRareOrder = {
  hash: string
  collectionAddress: string
  tokenId: string
  isOrderAsk: boolean
  signer: string
  strategy: string
  currencyAddress: string
  amount: string
  price: string
  nonce: string
  startTime: number
  endTime: number
  minPercentageToAsk: number
  params: string
  status: string
  signature: string
  v?: number
  r?: string
  s?: string
}

export class LooksRare {
  public buildFetchOrdersUrl(
    params: FetchOrdersParams,
    pagination?: FetchOrdersPaginationParams,
  ) {
    let baseApiUrl: string
    if (Number(process.env.CHAIN_ID) === 1) {
      baseApiUrl = 'https://api.looksrare.org/api/v1'
    } else if (Number(process.env.CHAIN_ID) === 5) {
      baseApiUrl = 'https://api-goerli.looksrare.org/api/v1'
    } else {
      throw new Error('Unsupported chain')
    }

    const searchParams = new URLSearchParams({
      // isOrderAsk: "true",
      sort: 'NEWEST',
    })

    searchParams.append(
      'collection',
      '0x24e5bba6218d711ee675a844fc237f1ebfe83fe9',
    )
    searchParams.append('status[]', 'VALID')

    if (params.startTime) {
      searchParams.append('startTime', String(params.startTime))
    }

    if (params.endTime) {
      searchParams.append('endTime', String(params.endTime))
    }

    if (pagination) {
      searchParams.append('pagination[limit]', String(pagination.limit))
      searchParams.append('pagination[cursor}', pagination.cursor)
    }

    return decodeURI(`${baseApiUrl}/orders?${searchParams.toString()}`)
  }

  public async parseLooksRareOrder(
    looksRareOrder: LooksRareOrder,
  ): Promise<Sdk.LooksRare.Order | undefined> {
    try {
      const order = new Sdk.LooksRare.Order(Number(process.env.CHAIN_ID), {
        collection: looksRareOrder.collectionAddress,
        tokenId: looksRareOrder.tokenId || '0',
        isOrderAsk: Boolean(looksRareOrder.isOrderAsk),
        signer: looksRareOrder.signer,
        strategy: looksRareOrder.strategy,
        currency: looksRareOrder.currencyAddress,
        amount: looksRareOrder.amount,
        price: looksRareOrder.price,
        startTime: looksRareOrder.startTime,
        endTime: looksRareOrder.endTime,
        minPercentageToAsk: looksRareOrder.minPercentageToAsk,
        params: looksRareOrder.params == '' ? '0x' : looksRareOrder.params,
        nonce: looksRareOrder.nonce,
        v: looksRareOrder.v,
        r: looksRareOrder.r,
        s: looksRareOrder.s,
      })

      if (order.hash() === looksRareOrder.hash) {
        order.checkValidity()
        order.checkSignature()
        return order
      }
    } catch (error) {
      // skip any errors
    }
  }
}
