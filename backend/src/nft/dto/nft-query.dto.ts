import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsInt, IsString } from 'class-validator'

export class NftQueryDto {
  @IsOptional()
  @ApiProperty()
  marketplace?: number

  @IsOptional()
  @ApiProperty()
  contractAddress?: string

  @IsOptional()
  @ApiProperty()
  withMetadata?: boolean

  @IsOptional()
  @ApiProperty()
  limit?: number
}
