import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { DemoModule } from './demo/demo.module'
import { MarketplaceModule } from './marketplace/marketplace.module'
import { NftModule } from './nft/nft.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    AdminModule,
    DemoModule,
    MarketplaceModule,
    NftModule,
  ],
})
export class AppModule {}
