import { Module } from '@nestjs/common'
import { MarketplaceModule } from 'src/marketplace/marketplace.module'
import { NftController } from './nft.controller'
import { NftService } from './nft.service'

@Module({
  controllers: [NftController],
  providers: [NftService],
  imports: [MarketplaceModule],
})
export class NftModule {}
