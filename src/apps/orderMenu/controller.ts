import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderMenuService } from './service';
import { OrderMenuQueryDto } from './dto';
import { OrderMenuEntity } from './entity';

@ApiBearerAuth()
@ApiTags('orderMenu')
@Controller('/orderMenus')
export class OrderMenuController {
  constructor(private readonly orderMenuService: OrderMenuService) {}

  @Get()
  async findOrderMenus(
    @Query() dto: OrderMenuQueryDto,
  ): Promise<Array<OrderMenuEntity>> {
    return await this.orderMenuService.findOrderMenus(dto);
  }
}
