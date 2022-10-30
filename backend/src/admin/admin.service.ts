import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, getClient } from '@reservoir0x/reservoir-kit-client'
import { Network, Alchemy } from 'alchemy-sdk'
import axios from 'axios'
import { PrismaService } from 'src/prisma/prisma.service'

export const constAddress = {
  testCollectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
}

export const constUrl = {
  openseaV1TestnetURL: 'https://testnets-api.opensea.io/api/v1',
  alchemyMumbaiNetApiURL: 'https://polygon-mumbai.g.alchemy.com/v2',
  alchemyGoerliNetApiURL: 'https://eth-goerli.g.alchemy.com/nft/v2',
  etherscanGoerliNetApiURL: 'https://api-goerli.etherscan.io/api',
  polygonscanMumbaiNetApiURL: 'https://api-testnet.polygonscan.com/api',
}

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

  async testAlchemyApi() {
    // list
    const url =
      constUrl.alchemyGoerliNetApiURL +
      `/${this.config.get('ALCHEMY_API_KEY')}` +
      '/getNFTsForCollection/'

    const res = await axios.get(url, {
      params: {
        contractAddress: this.testCollectionAddress,
        withMetadata: true,
        startToken: 0,
        limit: 100,
      },
    })
    console.log({
      data: res.data,
    })

    const sampleToken = {
      contractAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
      contractMetadata: {
        name: 'orderbook_test',
        totalSupply: '9',
        tokenType: 'ERC721',
      },
      id: {
        tokenId:
          '0x0000000000000000000000000000000000000000000000000000000000000004',
        tokenMetadata: {
          tokenType: 'ERC721',
        },
      },
      title: 'OBT#005',
      description: 'magic_card reborn',
      tokenUri: {
        raw: 'ipfs://QmNxZRdMTLhyrcDAUghgoGYRQdg6PQbgK8XSTiwD1E6vaC/4',
        gateway:
          'https://ipfs.io/ipfs/QmNxZRdMTLhyrcDAUghgoGYRQdg6PQbgK8XSTiwD1E6vaC/4',
      },
      media: [
        {
          raw: 'ipfs://QmSD4Ldf9B1iTd8iCEmbhag6mX12aQaH8mVF2KsySJvLgF/4.png',
          gateway:
            'https://ipfs.io/ipfs/QmSD4Ldf9B1iTd8iCEmbhag6mX12aQaH8mVF2KsySJvLgF/4.png',
        },
      ],
      metadata: {
        name: 'OBT#005',
        description: 'magic_card reborn',
        image: 'ipfs://QmSD4Ldf9B1iTd8iCEmbhag6mX12aQaH8mVF2KsySJvLgF/4.png',
        attributes: [
          {
            value: 'magic',
            trait_type: 'type',
          },
          {
            value: 'common',
            trait_type: 'effect',
          },
        ],
      },
      timeLastUpdated: '2022-10-30T09:05:11.880Z',
    }

    const sample = {
      contract: {
        address: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
      },
      id: {
        tokenId:
          '0x0000000000000000000000000000000000000000000000000000000000000004',
        tokenMetadata: {
          tokenType: 'ERC721',
        },
      },
      title: 'OBT#005',
      description: 'magic_card reborn',
      tokenUri: {
        raw: 'ipfs://QmNxZRdMTLhyrcDAUghgoGYRQdg6PQbgK8XSTiwD1E6vaC/4',
        gateway:
          'https://ipfs.io/ipfs/QmNxZRdMTLhyrcDAUghgoGYRQdg6PQbgK8XSTiwD1E6vaC/4',
      },
      media: [
        {
          raw: 'ipfs://QmSD4Ldf9B1iTd8iCEmbhag6mX12aQaH8mVF2KsySJvLgF/4.png',
          gateway:
            'https://ipfs.io/ipfs/QmSD4Ldf9B1iTd8iCEmbhag6mX12aQaH8mVF2KsySJvLgF/4.png',
        },
      ],
      metadata: {
        name: 'OBT#005',
        description: 'magic_card reborn',
        image: 'ipfs://QmSD4Ldf9B1iTd8iCEmbhag6mX12aQaH8mVF2KsySJvLgF/4.png',
        attributes: [
          {
            value: 'magic',
            trait_type: 'type',
          },
          {
            value: 'common',
            trait_type: 'effect',
          },
        ],
      },
      timeLastUpdated: '2022-10-30T09:05:11.880Z',
      contractMetadata: {
        name: 'orderbook_test',
        totalSupply: '9',
        tokenType: 'ERC721',
      },
    }

    // const url2 =
    //   constUrl.alchemyGoerliNetApiURL +
    //   `/${this.config.get('ALCHEMY_API_KEY')}` +
    //   '/getNFTMetadata/'
    // const res2 = await axios.get(url2, {
    //   params: {
    //     contractAddress: this.testCollectionAddress,
    //     tokenId: 4,
    //   },
    // })
    // console.log({
    //   data: res2.data,
    // })

    return res.data
  }

  async testAlchemySdk() {
    // Optional config object
    const settings = {
      apiKey: this.config.get('ALCHEMY_API_KEY'),
      network: Network.ETH_GOERLI,
    }
    const alchemy = new Alchemy(settings)
    // Print nfts owned
    const ownerAddr = '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852'
    console.log('fetching FNTs for address:', ownerAddr)
    const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr)
    console.log('number of NFTs found', nftsForOwner.totalCount)
    for (const nft of nftsForOwner.ownedNfts) {
      console.log('===')
      console.log('contract address:', nft.contract.address)
      console.log('token ID:', nft.tokenId)
    }
    console.log('===')

    // Fetch metadata for a particular NFT
    const nftRes = await alchemy.nft.getNftMetadata(
      this.testCollectionAddress,
      5,
    )
    console.log('NFT name: ', nftRes.title)
    console.log('token type: ', nftRes.tokenType)
    console.log('tokenUri: ', nftRes.tokenUri.gateway)
    console.log('image url: ', nftRes.rawMetadata.image)
    console.log('time last updated: ', nftRes.timeLastUpdated)
    console.log('===')

    const nfts = await alchemy.nft.getNftsForContract(
      this.testCollectionAddress,
    )
    for (const nft of nfts.nfts) {
      console.log('===')
      console.log({
        nft,
      })
    }
    console.log('===')
  }

  async asks() {
    const client = getClient()
    const url =
      `${this.testBaseUrl}/orders/asks/v3` +
      `?contracts=${this.testCollectionAddress}` +
      `&token=${this.testCollectionAddress}:4` +
      '&includePrivate=false&includeMetadata=false&includeRawData=false&sortBy=createdAt&limit=50'

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'x-api-key': this.apiKey,
      },
    })
    const data = await res.json()
    console.log({
      url,
      res,
      data,
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
        'x-api-key': this.apiKey,
      },
    })
    const data = await res.json()
    console.log({
      url,
      res,
      data,
    })
    return data
  }

  async collections() {
    const client = getClient()
    const url =
      `${this.testBaseUrl}/collections/v5` +
      `?contract=${this.testCollectionAddress}` +
      '&includeTopBid=false&sortBy=allTimeVolume&limit=20'

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
    })
    return data
  }

  async stats() {
    const client = getClient()
    const url =
      `${this.testBaseUrl}/stats/v2` +
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
    })
    return data
  }

  async dailyVolume() {
    const client = getClient()
    const url =
      `${this.testBaseUrl}/collections/daily-volume/v1` +
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
    })
    return data
  }

  async tokens() {
    const client = getClient()
    const url =
      `${this.testBaseUrl}/tokens/v5` +
      `?collection=${this.testCollectionAddress}` +
      '&sortBy=floorAskPrice&limit=20&includeTopBid=false&includeAttributes=false'

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
