import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { BuyListingDto } from './dto/buy-listing.dto'
import { CreateListingDto } from './dto/create-listing.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderService } from './order.service'

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('listings')
  getListings() {
    return 'get listings'
  }

  @Post('listings')
  @ApiOperation({ summary: 'Create an Orderbook listing' })
  createListing(@Body() dto: CreateListingDto) {
    return this.orderService.createListing(dto)
  }

  @Post('buy')
  buy(@Body() dto: BuyListingDto) {
    return this.orderService.buyListing(dto)
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto)
  }

  @Get()
  findAll() {
    return this.orderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id)
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
