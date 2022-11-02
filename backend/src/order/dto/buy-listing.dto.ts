import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsNumber, IsInt, IsString } from 'class-validator'

export class BuyListingDto {
  @IsInt()
  @ApiProperty()
  id: number

  @IsString()
  @ApiProperty()
  taker: string
}
