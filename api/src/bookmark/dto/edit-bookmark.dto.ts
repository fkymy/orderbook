import { IsString, IsOptional, IsNotEmpty } from 'class-validator'

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  link?: string
}
