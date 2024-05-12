import { EntityRepository, Repository, FindConditions } from 'typeorm';
import { OrderMenuItemEntity } from './entity';

@EntityRepository(OrderMenuItemEntity)
export class OrderMenuItemRepository extends Repository<OrderMenuItemEntity> {
  async findList(
    where: FindConditions<OrderMenuItemEntity>,
  ): Promise<OrderMenuItemEntity[]> {
    return await this.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
