import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class MenuItemQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  menuId?: string;
}

export class MenuItemCreateDto {
  @ApiProperty({ type: Number })
  @IsInt()
  menuId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  itemId: number;
}

export class MenuItemDeleteDto extends MenuItemCreateDto {}
