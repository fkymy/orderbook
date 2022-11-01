import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsNumber, IsInt, IsString } from 'class-validator'

export class CreateListingDto {
  // @ApiProperty()
  // kind: 'seaport' | 'looks-rare' | 'x2y2' | 'orderbook'
  //
  // @ApiProperty()
  // side: 'ask' | 'buy'

  @IsString()
  @ApiProperty()
  contract: string

  @IsInt()
  @ApiProperty()
  tokenId: number

  @IsString()
  @ApiProperty()
  maker: string

  // @ApiProperty()
  // currencyName: string
  //
  // @ApiProperty()
  // currencySymbol: string

  // @IsInt()
  // @ApiProperty()
  // decimals: number

  // @IsString()
  // @ApiProperty()
  // rawAmount: string

  @IsNumber()
  @ApiProperty()
  decimalAmount: number
}
