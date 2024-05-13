import { Injectable } from '@nestjs/common';
import { Connection, FindConditions, In } from 'typeorm';
import { TableRepository } from '../table/repository';
import { MenuRepository } from '../menu/repository';
import { MenuEntity } from '../menu/entity';
import { MenuItemRepository } from '../menuItem/repository';
import { ItemRepository } from '../item/repository';
import { OrderRepository } from '../order/repository';
import { OrderMenuRepository } from '../orderMenu/repository';
import { OrderMenuItemRepository } from '../orderMenuItem/repository';
import { TableEntity } from '../table/entity';
import { MenuItemEntity } from '../menuItem/entity';
import { ItemEntity } from '../item/entity';
import { PlaceOrderCreateDto } from './dto';
import { OrderEntity } from '../order/entity';
import { OrderMenuEntity } from '../orderMenu/entity';
import { OrderMenuItemEntity } from '../orderMenuItem/entity';

@Injectable()
export class PlaceOrderService {
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly menuRepository: MenuRepository,
    private readonly menuItemRepository: MenuItemRepository,
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderMenuRepository: OrderMenuRepository,
    private readonly orderMenuItemRepository: OrderMenuItemRepository,
    private readonly connection: Connection,
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
      enable: true,
    };

    return await this.itemRepository.findList(itemWhere);
  }

  async createOrder(dto: PlaceOrderCreateDto): Promise<void> {
    await this.connection.transaction(async (manager) => {
      const order = await manager.save(OrderEntity, {
        note: '',
        tableName: dto.tableName,
        totalPrice: dto.totalPrice,
        status: 'processing',
        userId: dto.userId,
      });
      for (let i = 0; i < dto.menus.length; i++) {
        const menu = dto.menus[i];
        const orderMenu = await manager.save(OrderMenuEntity, {
          menuName: menu.menuName,
          orderId: order.id,
        });

        for (let j = 0; j < menu.items.length; j++) {
          const item = menu.items[j];
          await manager.save(OrderMenuItemEntity, {
            itemName: item.itemName,
            itemImage: item.itemImage,
            itemPrice: item.itemPrice,
            itemDescription: item.itemDescription,
            itemCount: item.itemCount,
            orderMenuId: orderMenu.id,
          });
        }
      }
    });
  }
}
