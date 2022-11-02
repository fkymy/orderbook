import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { AdminService } from './admin.service'

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  testBaseUrl = 'https://api-goerli.reservoir.tools'
  testCollectionAddress = '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741'

  constructor(private adminService: AdminService) {}

  // TODO:
  // Collection Sets
  // Transfers
  // - historical token transfers
  // Activity
  // - collection activity (feed)

  @Get('manage')
  @ApiOperation({ summary: 'Get API Rate Limits' })
  manage() {
    return this.adminService.manage()
  }

  @Get('test-kit')
  @ApiOperation({ summary: 'Test reservoir kit client' })
  testKet() {
    return this.adminService.testKit()
  }

  @Get('test-alchemy-sdk')
  test() {
    return this.adminService.testAlchemySdk()
  }

  @Get('orders/asks')
  @ApiOperation({ summary: 'Get a list of listings' })
  asks() {
    return this.adminService.asks()
  }

  @Get('orders/bids')
  @ApiOperation({ summary: 'Get a list of bids' })
  bids() {
    return this.adminService.bids()
  }

  @Get('collections')
  @ApiOperation({ summary: 'Collection overview' })
  collections() {
    return this.adminService.collections()
  }

  @Get('collections/sources')
  @ApiOperation({ summary: 'Aggregated listings info per source' })
  sources() {
    return this.adminService.sources()
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get aggregate stats for a particular set' })
  stats() {
    return this.adminService.stats()
  }

  @Get('daily-volumes')
  @ApiOperation({ summary: 'Daily volumes, rank, sales' })
  dailyVolume() {
    return this.adminService.dailyVolume()
  }

  @Get('tokens')
  @ApiOperation({ summary: 'Get a list of tokens with full metadata' })
  tokens() {
    return this.adminService.tokens()
  }
}
