import { EntityRepository, FindConditions, Repository, Not } from 'typeorm';
import { LodashUtil } from 'src/bases';
import { UserEntity } from './entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findList(where: FindConditions<UserEntity>): Promise<UserEntity[]> {
    return await this.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.findOne({
      where: [{ username }],
    });
  }

  async existByUsername(username: string, id?: number): Promise<boolean> {
    let where: FindConditions<UserEntity>[] = [{ username }];

    if (id) {
      where = LodashUtil.map(where, (item) => ({ ...item, id: Not(id) }));
    }

    const result = await this.count({
      where,
    });

    return result >= 1;
  }
}
