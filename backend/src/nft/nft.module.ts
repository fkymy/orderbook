import { Module } from '@nestjs/common'
import { MarketplaceModule } from 'src/marketplace/marketplace.module'
import { OrderModule } from 'src/order/order.module'
import { NftController } from './nft.controller'
import { NftService } from './nft.service'

@Module({
  controllers: [NftController],
  providers: [NftService],
  imports: [MarketplaceModule, OrderModule],
})
export class NftModule {}
