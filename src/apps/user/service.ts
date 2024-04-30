import { Injectable } from '@nestjs/common';
import { FindConditions, Like } from 'typeorm';
import { DigestUtil, HttpException } from 'src/bases';
import { UserRepository } from './repository';
import { UserEntity } from './entity';
import { UserCreateDto, UserQueryDto, UserUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers(dto: UserQueryDto): Promise<Array<UserEntity>> {
    const where: FindConditions<UserEntity> = {};
    if (dto.username) {
      where.username = Like(`%${dto.username}%`);
    }

    return await this.userRepository.findList(where);
  }

  async createUser(dto: UserCreateDto): Promise<void> {
    const exist = await this.userRepository.existByUsername(dto.username);

    if (exist) {
      throw new HttpException('User already exists');
    }

    const encodePassword = await DigestUtil.encode(dto.password);

    await this.userRepository.save({
      ...dto,
      password: encodePassword,
    });
  }

  async findUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async updateUserById(id: number, dto: UserUpdateDto): Promise<void> {
    const exist = await this.userRepository.existByUsername(dto.username, id);

    if (exist) {
      throw new HttpException('User already exists');
    }

    await this.userRepository.update(id, dto);
  }

  async updateUserEnableById(id: number, enable: boolean): Promise<void> {
    await this.userRepository.update(id, {
      enable,
    });
  }

  async resetUserPasswordById(id: number, newPassword: string): Promise<void> {
    const password = await DigestUtil.encode(newPassword);
    await this.userRepository.update(id, {
      password,
    });
  }
}
