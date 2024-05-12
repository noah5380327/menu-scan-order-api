import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './service';
import { OrderQueryDto } from './dto';
import { OrderEntity } from './entity';

@ApiBearerAuth()
@ApiTags('order')
@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findOrders(@Query() dto: OrderQueryDto): Promise<Array<OrderEntity>> {
    return await this.orderService.findOrders(dto);
  }
}
