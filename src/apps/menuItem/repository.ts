import { EntityRepository, Repository, FindConditions } from 'typeorm';
import { MenuItemEntity } from './entity';

@EntityRepository(MenuItemEntity)
export class MenuItemRepository extends Repository<MenuItemEntity> {
  async findList(
    where: FindConditions<MenuItemEntity>,
  ): Promise<MenuItemEntity[]> {
    return await this.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteByMenuIdAndItemId(menuId: number, itemId: number): Promise<void> {
    await this.delete({
      menuId,
      itemId,
    });
  }
}
