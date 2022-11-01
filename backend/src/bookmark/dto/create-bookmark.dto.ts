import { IsString, IsOptional, IsNotEmpty } from 'class-validator'

export class CreateBookmarkDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  link: string
}
