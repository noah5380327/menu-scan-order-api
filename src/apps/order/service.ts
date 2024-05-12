import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { OrderRepository } from './repository';
import { OrderEntity } from './entity';
import { OrderQueryDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findOrders(dto: OrderQueryDto): Promise<Array<OrderEntity>> {
    const where: FindConditions<OrderEntity> = {};
    if (dto.userId) {
      where.userId = Number(dto.userId);
    }

    return await this.orderRepository.findList(where);
  }
}
