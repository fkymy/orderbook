import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import config from 'src/config'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { DemoModule } from './demo/demo.module'
import { IndexerModule } from './indexer/indexer.module'
import { MarketplaceModule } from './marketplace/marketplace.module'
import { NftModule } from './nft/nft.module'
import { OrderModule } from './order/order.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    PrismaModule,
    AdminModule,
    DemoModule,
    MarketplaceModule,
    NftModule,
    OrderModule,
    IndexerModule,
  ],
})
export class AppModule {}
