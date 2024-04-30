import { EntityRepository, FindConditions, Repository, Not } from 'typeorm';
import { LodashUtil } from 'src/bases';
import { MenuEntity } from './entity';

@EntityRepository(MenuEntity)
export class MenuRepository extends Repository<MenuEntity> {
  async findList(where: FindConditions<MenuEntity>): Promise<MenuEntity[]> {
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
    let where: FindConditions<MenuEntity>[] = [{ name, userId }];

    if (id) {
      where = LodashUtil.map(where, (item) => ({ ...item, id: Not(id) }));
    }

    const result = await this.count({
      where,
    });

    return result >= 1;
  }
}
