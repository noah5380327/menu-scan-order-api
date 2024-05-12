import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './service';
import { OrderEntity } from './entity';
import { TokenPayload, TokenSubject } from '../../bases';

@ApiBearerAuth()
@ApiTags('order')
@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findOrders(
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<Array<OrderEntity>> {
    return await this.orderService.findOrders(tokenSubject);
  }
}
