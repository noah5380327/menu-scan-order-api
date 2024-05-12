import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class OrderQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  userId?: string;
}
