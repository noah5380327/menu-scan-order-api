import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { TokenPayload } from 'src/bases';
import { MenuItemRepository } from './repository';
import { MenuItemEntity } from './entity';
import { MenuItemQueryDto, MenuItemCreateDto, MenuItemDeleteDto } from './dto';

@Injectable()
export class MenuItemService {
  constructor(private readonly menuItemRepository: MenuItemRepository) {}

  async findMenuItems(
    dto: MenuItemQueryDto,
    tokenSubject: TokenPayload,
  ): Promise<Array<MenuItemEntity>> {
    const where: FindConditions<MenuItemEntity> = {
      userId: tokenSubject.userId,
    };
    if (dto.menuId) {
      where.menuId = Number(dto.menuId);
    }

    return await this.menuItemRepository.findList(where);
  }

  async createMenuItem(
    dto: MenuItemCreateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.menuItemRepository.save({
      ...dto,
      userId: tokenSubject.userId,
    });
  }

  async deleteMenuItem(dto: MenuItemDeleteDto): Promise<void> {
    await this.menuItemRepository.deleteByMenuIdAndItemId(
      dto.menuId,
      dto.itemId,
    );
  }
}
