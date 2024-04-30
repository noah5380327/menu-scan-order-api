import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class ItemQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;
}

export class ItemCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  sort?: number;
}

export class ItemUpdateDto extends ItemCreateDto {}
