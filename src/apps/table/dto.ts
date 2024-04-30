import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class TableQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;
}

export class TableCreateDto {
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

export class TableUpdateDto extends TableCreateDto {}
