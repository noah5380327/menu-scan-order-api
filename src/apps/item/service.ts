import { Injectable } from '@nestjs/common';
import { FindConditions, Like, Connection } from 'typeorm';
import { HttpException, TokenPayload } from 'src/bases';
import { ItemRepository } from './repository';
import { ItemEntity } from './entity';
import { ItemCreateDto, ItemQueryDto, ItemUpdateDto } from './dto';
import { MenuItemEntity } from '../menuItem/entity';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly connection: Connection,
  ) {}

  async findItems(
    dto: ItemQueryDto,
    tokenSubject: TokenPayload,
  ): Promise<Array<ItemEntity>> {
    const where: FindConditions<ItemEntity> = {
      userId: tokenSubject.userId,
    };
    if (dto.name) {
      where.name = Like(`%${dto.name}%`);
    }
    if (dto.enable !== undefined) {
      where.enable = Boolean(dto.enable);
    }

    return await this.itemRepository.findList(where);
  }

  async createItem(
    dto: ItemCreateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    const exist = await this.itemRepository.existByName(
      dto.name,
      tokenSubject.userId,
    );

    if (exist) {
      throw new HttpException('Item already exists');
    }

    await this.itemRepository.save({
      ...dto,
      userId: tokenSubject.userId,
    });
  }

  async findItemById(id: number): Promise<ItemEntity> {
    return await this.itemRepository.findOne(id);
  }

  async updateItemById(
    id: number,
    dto: ItemUpdateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    const exist = await this.itemRepository.existByName(
      dto.name,
      tokenSubject.userId,
      id,
    );

    if (exist) {
      throw new HttpException('Item already exists');
    }

    await this.itemRepository.update(id, dto);
  }

  async updateItemEnableById(id: number, enable: boolean): Promise<void> {
    await this.itemRepository.update(id, {
      enable,
    });
  }

  async deleteItemById(id: number): Promise<void> {
    await this.connection.transaction(async (manager) => {
      await manager.delete(MenuItemEntity, { itemId: id });
      await manager.delete(ItemEntity, id);
    });
  }
}
