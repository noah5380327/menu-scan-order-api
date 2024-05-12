import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class OrderMenuQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  orderId?: string;
}
