import { EntityRepository, Repository, In } from 'typeorm';
import { MenuItemEntity } from './entity';

@EntityRepository(MenuItemEntity)
export class MenuItemRepository extends Repository<MenuItemEntity> {
  async findListByMenuId(menuId: string): Promise<MenuItemEntity[]> {
    return await this.find({
      where: {
        menuId,
      },
    });
  }
}
