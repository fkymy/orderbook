import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { BuyListingDto } from './dto/buy-listing.dto'
import { CreateListingDto } from './dto/create-listing.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderService } from './order.service'

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orderbook/listings')
  findAllNative() {
    return this.orderService.findAllNativeListings()
  }

  @Post('orderbook/listings')
  @ApiOperation({ summary: 'Create an Orderbook listing' })
  createListing(@Body() dto: CreateListingDto) {
    return this.orderService.createListing(dto)
  }

  @Post('orderbook/buy')
  @ApiOperation({ summary: 'Buy from an Orderbook listing' })
  buy(@Body() dto: BuyListingDto) {
    return this.orderService.buyListing(dto)
  }

  @Get('listings')
  @ApiQuery({ name: 'marketplace', required: true, type: Number })
  @ApiOperation({ summary: 'Get aggregated listings' })
  getListings(@Query('marketplace', ParseIntPipe) marketplaceId: number) {
    return this.orderService.getOrdersForMarketplace(marketplaceId)
  }

  @Get('sample')
  getSampleOrders() {
    return this.orderService.getSampleOrders()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id)
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id)
  }
}
