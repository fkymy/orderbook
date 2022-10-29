import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, getClient } from '@reservoir0x/reservoir-kit-client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AdminService {
  sdk: any
  apiKey = 'dc90c81b-ef38-5355-9d6d-5fa316360197'
  testApiKey = 'demo-api-key'
  testBaseUrl = 'https://api-goerli.reservoir.tools'
  testCollectionAddress = '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741'
  testCollectionSetId =
    '5c93e3b29f2072a7d4206fb9c5602376822c602843186f05846d7d0c3dbe3ccf'

  baseUrl = 'https://api.reservoir.tools'
  collectionAddress = '0x629a673a8242c2ac4b7b8c5d8735fbeac21a6205'
  collectionSet =
    'f7255476e3a86310e688307089d85d4a73c05b64642bd2f0a82f5ca91e8cbeb0'

  constructor(private prisma: PrismaService, private config: ConfigService) {
    createClient({
      apiBase: 'https://api-goerli.reservoir.tools',
      apiKey: 'demo-api-key',
      source: 'http://localhost:3001',
    })
  }

  async manage() {
    const client = getClient()
    const url = this.testBaseUrl + `/api-keys/${this.apiKey}/rate-limits`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': this.testApiKey,
      },
    })
    const data = await res.json()
    console.log({
      url,
      res,
      data,
      client,
    })
    return data
  }

  async testKit() {
    const client = getClient()
    console.log({
      client,
    })
  }

  async asks() {
    const client = getClient()
    const url =
      `${this.testBaseUrl}/orders/asks/v3` +
      `?contracts=${this.testCollectionAddress}` +
      '&includePrivate=false&includeMetadata=false&includeRawData=false&sortBy=createdAt&limit=50'

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'x-api-key': this.testApiKey,
      },
    })
    const data = await res.json()
    console.log({
      url,
      res,
      data,
      client,
    })
    return data
  }

  async bids() {
    const client = getClient()
    const url =
      `${this.testBaseUrl}/orders/bids/v4` +
      `?contracts=${this.testCollectionAddress}` +
      '&includeMetadata=false&includeRawData=false&sortBy=createdAt&limit=50'

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'x-api-key': this.testApiKey,
      },
    })
    const data = await res.json()
    console.log({
      url,
      res,
      data,
      client,
    })
    return data
  }

  async sources() {
    const client = getClient()
    const url =
      `${this.testBaseUrl}/collections/sources/v1` +
      `?collection=${this.testCollectionAddress}`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'x-api-key': this.testApiKey,
      },
    })
    const data = await res.json()
    console.log({
      url,
      res,
      data,
      client,
    })
    return data
  }

  async test() {
    // Get API key rate limit
    const url =
      `${this.testBaseUrl}/collections/v5` +
      `?id=${this.testCollectionAddress}` +
      `&includeTopBid=false&sortBy=allTimeVolume&limit=20`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': this.testApiKey,
      },
    })
    const data = await res.json()
    console.log({
      res,
      data,
    })
    return data
  }
}
