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

  // Management
  // - API key rate limit
  // Orders
  // - listings for a collection
  // - bids for a collection
  // Collections
  // - token(s) with full metadata
  // - collection source stats
  // Collection Sets
  // Stats
  // - aggregated stats
  // - daily collection volume
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

  @Get('collections/sources')
  @ApiOperation({ summary: 'Aggregated listings info per source' })
  sources() {
    return this.adminService.sources()
  }

  @Get('test')
  test() {
    console.log({
      test: 'test',
    })

    return 'test'
  }
}
