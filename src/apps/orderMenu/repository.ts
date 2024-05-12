import { EntityRepository, Repository, FindConditions } from 'typeorm';
import { OrderMenuEntity } from './entity';

@EntityRepository(OrderMenuEntity)
export class OrderMenuRepository extends Repository<OrderMenuEntity> {
  async findList(
    where: FindConditions<OrderMenuEntity>,
  ): Promise<OrderMenuEntity[]> {
    return await this.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
