class Source {
  id: string
  domain: string
  name: string
  icon: string
  url: string
}

class Price {
  currency: {
    contract: string
    name: string
    symbol: string
    decimals: number
  }
  amount: {
    raw: string
    decimal: number
    usd: number
    nativce: number
  }
}

export class Order {
  id: string
  kind: string
  side: string
  status: string
  tokenSetId: string
  tokenSetShcemaHash: string
  contract: string
  maker: string
  taker: string
  price: Price
  validFrom: number
  validUntil: number
  quantityFilled: number
  quantityRemaining: number
  source: Source
  feeBos: number
  feeBreakdown: [
    {
      bps: number
      kind: string
      recipient: string
    },
  ]
  expiration: number
  isReservoir: boolean
  isOrderbook: boolean
  isDynamic: boolean
  createdAt: string
  updatedAt: string
}
