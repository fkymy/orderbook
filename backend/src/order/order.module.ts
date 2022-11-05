import { Module } from '@nestjs/common'
import { MarketplaceModule } from 'src/marketplace/marketplace.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
  imports: [MarketplaceModule],
})
export class OrderModule {}
