import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { OrderMenuItemRepository } from './repository';
import { OrderMenuItemEntity } from './entity';
import { OrderMenuItemQueryDto } from './dto';

@Injectable()
export class OrderMenuItemService {
  constructor(
    private readonly orderMenuItemRepository: OrderMenuItemRepository,
  ) {}

  async findOrderMenuItems(
    dto: OrderMenuItemQueryDto,
  ): Promise<Array<OrderMenuItemEntity>> {
    const where: FindConditions<OrderMenuItemEntity> = {};
    if (dto.orderMenuId) {
      where.orderMenuId = Number(dto.orderMenuId);
    }

    return await this.orderMenuItemRepository.findList(where);
  }
}
