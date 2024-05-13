import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { OrderRepository } from './repository';
import { OrderEntity } from './entity';
import { TokenPayload } from '../../bases';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findOrders(tokenSubject: TokenPayload): Promise<Array<OrderEntity>> {
    const where: FindConditions<OrderEntity> = {
      userId:
        tokenSubject.userId > 1234567890
          ? tokenSubject.userId - 1234567890
          : tokenSubject.userId,
    };

    return await this.orderRepository.findList(where);
  }

  async updateOrderStatusById(id: number, status: string): Promise<void> {
    await this.orderRepository.update(id, {
      status,
    });
  }
}
