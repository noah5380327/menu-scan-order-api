import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { OrderMenuRepository } from './repository';
import { OrderMenuEntity } from './entity';
import { OrderMenuQueryDto } from './dto';

@Injectable()
export class OrderMenuService {
  constructor(private readonly orderMenuRepository: OrderMenuRepository) {}

  async findOrderMenus(
    dto: OrderMenuQueryDto,
  ): Promise<Array<OrderMenuEntity>> {
    const where: FindConditions<OrderMenuEntity> = {};
    if (dto.orderId) {
      where.orderId = Number(dto.orderId);
    }

    return await this.orderMenuRepository.findList(where);
  }
}
