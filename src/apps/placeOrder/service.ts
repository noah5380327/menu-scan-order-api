import { Injectable } from '@nestjs/common';
import { FindConditions, In } from 'typeorm';
import { TableRepository } from '../table/repository';
import { MenuRepository } from '../menu/repository';
import { MenuEntity } from '../menu/entity';
import { MenuItemRepository } from '../menuItem/repository';
import { ItemRepository } from '../item/repository';
import { TableEntity } from '../table/entity';
import { MenuItemEntity } from '../menuItem/entity';
import { ItemEntity } from '../item/entity';

@Injectable()
export class PlaceOrderService {
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly menuRepository: MenuRepository,
    private readonly menuItemRepository: MenuItemRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  async findTable(tableId: number): Promise<TableEntity> {
    const where: FindConditions<TableEntity> = {
      id: tableId,
      enable: true,
    };

    return await this.tableRepository.findOne(where);
  }

  async findMenus(userId: number): Promise<Array<MenuEntity>> {
    const where: FindConditions<MenuEntity> = {
      userId,
      enable: true,
    };

    return await this.menuRepository.findList(where);
  }

  async findItems(menuId: number): Promise<Array<ItemEntity>> {
    const menuItemWhere: FindConditions<MenuItemEntity> = {
      menuId,
    };

    const menuItems = await this.menuItemRepository.findList(menuItemWhere);
    const itemIds = menuItems.map((i) => i.itemId);

    const itemWhere: FindConditions<ItemEntity> = {
      id: In(itemIds),
    };

    return await this.itemRepository.findList(itemWhere);
  }
}
