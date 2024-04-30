import { EntityRepository, FindConditions, Repository, Not } from 'typeorm';
import { LodashUtil } from 'src/bases';
import { TableEntity } from './entity';

@EntityRepository(TableEntity)
export class TableRepository extends Repository<TableEntity> {
  async findList(where: FindConditions<TableEntity>): Promise<TableEntity[]> {
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
    let where: FindConditions<TableEntity>[] = [{ name, userId }];

    if (id) {
      where = LodashUtil.map(where, (item) => ({ ...item, id: Not(id) }));
    }

    const result = await this.count({
      where,
    });

    return result >= 1;
  }
}
