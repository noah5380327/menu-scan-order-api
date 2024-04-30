import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class MenuQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;
}

export class MenuCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  sort?: number;
}

export class MenuUpdateDto extends MenuCreateDto {}
