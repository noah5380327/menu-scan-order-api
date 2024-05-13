import { Injectable } from '@nestjs/common';
import { TokenService, HttpException, DigestUtil, MomentUtil } from 'src/bases';
import {
  CommonAdminLoginDto,
  CommonLoginDto,
  CommonRegisterDto,
  CommonStaffLoginDto,
} from './dto';
import { CommonAdminLoginVo, CommonLoginVo, CommonStaffLoginVo } from './vo';
import { UserRepository } from '../user/repository';
import { StaffRepository } from '../staff/repository';
import { AdminRepository } from '../admin/repository';

@Injectable()
export class CommonService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly staffRepository: StaffRepository,
    private readonly adminRepository: AdminRepository,
  ) {}

  get(): string {
    return MomentUtil.dateTimeFormat();
  }

  async login(dto: CommonLoginDto): Promise<CommonLoginVo> {
    const user = await this.userRepository.findOneByUsername(dto.username);

    if (!user) {
      throw new HttpException('User is not exist');
    }

    if (!user.enable) {
      throw new HttpException('User is locked');
    }

    const decodePassword = await DigestUtil.decode(user.password);

    if (decodePassword !== dto.password) {
      throw new HttpException('Password is incorrect');
    }

    const token = await this.tokenService.sign({
      userId: user.id,
    });

    return {
      user,
      token,
    };
  }

  async register(dto: CommonRegisterDto): Promise<CommonLoginVo> {
    const exist = await this.userRepository.existByUsername(dto.username);

    if (exist) {
      throw new HttpException('User already exists');
    }

    const encodePassword = await DigestUtil.encode(dto.password);

    const user = await this.userRepository.save({
      ...dto,
      password: encodePassword,
    });

    const token = await this.tokenService.sign({
      userId: user.id,
    });

    return {
      user,
      token,
    };
  }

  async staffLogin(dto: CommonStaffLoginDto): Promise<CommonStaffLoginVo> {
    const user = await this.staffRepository.findOneByUsername(dto.username);

    if (!user) {
      throw new HttpException('Staff is not exist');
    }

    if (!user.enable) {
      throw new HttpException('Staff is locked');
    }

    const decodePassword = await DigestUtil.decode(user.password);

    if (decodePassword !== dto.password) {
      throw new HttpException('Password is incorrect');
    }

    const token = await this.tokenService.sign({
      userId: user.userId + 1234567890,
    });

    return {
      user,
      token,
    };
  }

  async adminLogin(dto: CommonAdminLoginDto): Promise<CommonAdminLoginVo> {
    const user = await this.adminRepository.findOneByUsername(dto.username);

    if (!user) {
      throw new HttpException('Admin is not exist');
    }

    const decodePassword = await DigestUtil.decode(user.password);

    if (decodePassword !== dto.password) {
      throw new HttpException('Password is incorrect');
    }

    const token = await this.tokenService.sign({
      userId: user.id + 9876543210,
    });

    return {
      user,
      token,
    };
  }
}
