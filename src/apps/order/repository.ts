import { EntityRepository, Repository, FindConditions } from 'typeorm';
import { OrderEntity } from './entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
  async findList(where: FindConditions<OrderEntity>): Promise<OrderEntity[]> {
    return await this.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
