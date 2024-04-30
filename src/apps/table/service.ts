import { Injectable } from '@nestjs/common';
import { FindConditions, Like } from 'typeorm';
import { HttpException, TokenPayload } from 'src/bases';
import { TableRepository } from './repository';
import { TableEntity } from './entity';
import { TableCreateDto, TableQueryDto, TableUpdateDto } from './dto';

@Injectable()
export class TableService {
  constructor(private readonly tableRepository: TableRepository) {}

  async findTables(
    dto: TableQueryDto,
    tokenSubject: TokenPayload,
  ): Promise<Array<TableEntity>> {
    const where: FindConditions<TableEntity> = {
      userId: tokenSubject.userId,
    };
    if (dto.name) {
      where.name = Like(`%${dto.name}%`);
    }

    return await this.tableRepository.findList(where);
  }

  async createTable(
    dto: TableCreateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    const exist = await this.tableRepository.existByName(
      dto.name,
      tokenSubject.userId,
    );

    if (exist) {
      throw new HttpException('Table already exists');
    }

    await this.tableRepository.save({
      ...dto,
      userId: tokenSubject.userId,
    });
  }

  async findTableById(id: number): Promise<TableEntity> {
    return await this.tableRepository.findOne(id);
  }

  async updateTableById(
    id: number,
    dto: TableUpdateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    const exist = await this.tableRepository.existByName(
      dto.name,
      tokenSubject.userId,
      id,
    );

    if (exist) {
      throw new HttpException('Table already exists');
    }

    await this.tableRepository.update(id, dto);
  }

  async updateTableEnableById(id: number, enable: boolean): Promise<void> {
    await this.tableRepository.update(id, {
      enable,
    });
  }

  async deleteTableById(id: number): Promise<void> {
    await this.tableRepository.delete(id);
  }
}
