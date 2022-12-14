import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  MaxLength,
} from 'class-validator'

export class CreateMarketplaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  slug: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  image?: string

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  fee?: number

  @IsArray()
  @ArrayMaxSize(3)
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty()
  contractAddresses?: string[]
}
