import { EntityRepository, FindConditions, Repository, Not } from 'typeorm';
import { LodashUtil } from 'src/bases';
import { StaffEntity } from './entity';

@EntityRepository(StaffEntity)
export class StaffRepository extends Repository<StaffEntity> {
  async findList(where: FindConditions<StaffEntity>): Promise<StaffEntity[]> {
    return await this.find({
      where,
      order: {
        sort: 'DESC',
      },
    });
  }

  async existByUsername(
    username: string,
    userId: number,
    id?: number,
  ): Promise<boolean> {
    let where: FindConditions<StaffEntity>[] = [{ username, userId }];

    if (id) {
      where = LodashUtil.map(where, (item) => ({ ...item, id: Not(id) }));
    }

    const result = await this.count({
      where,
    });

    return result >= 1;
  }
}
