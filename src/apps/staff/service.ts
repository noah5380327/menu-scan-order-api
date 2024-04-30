import { Injectable } from '@nestjs/common';
import { FindConditions, Like } from 'typeorm';
import { DigestUtil, HttpException, TokenPayload } from 'src/bases';
import { StaffRepository } from './repository';
import { StaffEntity } from './entity';
import { StaffCreateDto, StaffQueryDto, StaffUpdateDto } from './dto';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async findStaffs(
    dto: StaffQueryDto,
    tokenSubject: TokenPayload,
  ): Promise<Array<StaffEntity>> {
    const where: FindConditions<StaffEntity> = {
      userId: tokenSubject.userId,
    };
    if (dto.username) {
      where.username = Like(`%${dto.username}%`);
    }

    return await this.staffRepository.findList(where);
  }

  async createStaff(
    dto: StaffCreateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    const exist = await this.staffRepository.existByUsername(
      dto.username,
      tokenSubject.userId,
    );

    if (exist) {
      throw new HttpException('Staff already exists');
    }

    const encodePassword = await DigestUtil.encode(dto.password);

    await this.staffRepository.save({
      ...dto,
      password: encodePassword,
      userId: tokenSubject.userId,
    });
  }

  async findStaffById(id: number): Promise<StaffEntity> {
    return await this.staffRepository.findOne(id);
  }

  async updateStaffById(
    id: number,
    dto: StaffUpdateDto,
    tokenSubject: TokenPayload,
  ): Promise<void> {
    const exist = await this.staffRepository.existByUsername(
      dto.username,
      tokenSubject.userId,
      id,
    );

    if (exist) {
      throw new HttpException('Staff already exists');
    }

    await this.staffRepository.update(id, dto);
  }

  async updateStaffEnableById(id: number, enable: boolean): Promise<void> {
    await this.staffRepository.update(id, {
      enable,
    });
  }

  async resetStaffPasswordById(id: number, newPassword: string): Promise<void> {
    const password = await DigestUtil.encode(newPassword);
    await this.staffRepository.update(id, {
      password,
    });
  }

  async deleteStaffById(id: number): Promise<void> {
    await this.staffRepository.delete(id);
  }
}
