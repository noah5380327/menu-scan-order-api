import { EntityRepository, Repository } from 'typeorm';
import { AdminEntity } from './entity';

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {
  async findOneByUsername(username: string): Promise<AdminEntity> {
    return await this.findOne({
      where: [{ username }],
    });
  }
}
