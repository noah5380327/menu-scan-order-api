import { EntityRepository, FindConditions, Repository, Not } from 'typeorm';
import { LodashUtil } from 'src/bases';
import { ItemEntity } from './entity';

@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {
  async findList(where: FindConditions<ItemEntity>): Promise<ItemEntity[]> {
    return await this.find({
      where,
      order: {
        sort: 'DESC',
      },
    });
  }

  async existByName(
    name: string,
    userId: number,
    id?: number,
  ): Promise<boolean> {
    let where: FindConditions<ItemEntity>[] = [{ name, userId }];

    if (id) {
      where = LodashUtil.map(where, (item) => ({ ...item, id: Not(id) }));
    }

    const result = await this.count({
      where,
    });

    return result >= 1;
  }
}
