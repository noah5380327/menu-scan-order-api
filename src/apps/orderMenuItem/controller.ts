import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderMenuItemService } from './service';
import { OrderMenuItemQueryDto } from './dto';
import { OrderMenuItemEntity } from './entity';

@ApiBearerAuth()
@ApiTags('orderMenuItem')
@Controller('/orderMenuItems')
export class OrderMenuItemController {
  constructor(private readonly orderMenuItemService: OrderMenuItemService) {}

  @Get()
  async findOrderMenuItems(
    @Query() dto: OrderMenuItemQueryDto,
  ): Promise<Array<OrderMenuItemEntity>> {
    return await this.orderMenuItemService.findOrderMenuItems(dto);
  }
}
