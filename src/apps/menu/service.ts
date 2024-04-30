import { Injectable } from '@nestjs/common';
import { FindConditions, Like, Connection } from 'typeorm';
import { HttpException, TokenPayload } from 'src/bases';
import { MenuRepository } from './repository';
import { MenuEntity } from './entity';
import { MenuCreateDto, MenuQueryDto, MenuUpdateDto } from './dto';
import { MenuItemEntity } from '../menuItem/entity';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly connection: Connection,
  ) {}

  async findMenus(
    dto: MenuQueryDto,
    tokenSubject: TokenPayload,
  ): Promise<Array<MenuEntity>> {
    const where: FindConditions<MenuEntity> = {
      userId: tokenSubject.userId,
    };
    if (dto.name) {
      where.name = Like(`%${dto.name}%`);
    }

    return await this.menuRepository.findList(where);
  }

  async createMenu(
    dto: MenuCreateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    const exist = await this.menuRepository.existByName(
      dto.name,
      tokenSubject.userId,
    );

    if (exist) {
      throw new HttpException('Menu already exists');
    }

    await this.menuRepository.save({
      ...dto,
      userId: tokenSubject.userId,
    });
  }

  async findMenuById(id: number): Promise<MenuEntity> {
    return await this.menuRepository.findOne(id);
  }

  async updateMenuById(
    id: number,
    dto: MenuUpdateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    const exist = await this.menuRepository.existByName(
      dto.name,
      tokenSubject.userId,
      id,
    );

    if (exist) {
      throw new HttpException('Menu already exists');
    }

    await this.menuRepository.update(id, dto);
  }

  async updateMenuEnableById(id: number, enable: boolean): Promise<void> {
    await this.menuRepository.update(id, {
      enable,
    });
  }

  async deleteMenuById(id: number): Promise<void> {
    await this.connection.transaction(async (manager) => {
      await manager.delete(MenuItemEntity, { menuId: id });
      await manager.delete(MenuEntity, id);
    });
  }
}
