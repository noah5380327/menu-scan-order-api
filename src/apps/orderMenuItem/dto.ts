import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class OrderMenuItemQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  orderMenuId?: string;
}
