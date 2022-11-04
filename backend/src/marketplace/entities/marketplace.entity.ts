import { ApiProperty } from '@nestjs/swagger'
import { Marketplace } from '@prisma/client'

type Contract = {
  id: number
  address: string
  name: string | null
  symbol: string | null
  totalSupply: number | null
  tokenType: string | null
  slug: string | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export class MarketplaceEntity implements Marketplace {
  id: number
  address: string | null
  name: string
  slug: string
  image: string | null
  fee: number | null
  createdAt: Date
  updatedAt: Date
}
