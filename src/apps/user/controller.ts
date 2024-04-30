import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './service';
import { UserCreateDto, UserQueryDto, UserUpdateDto } from './dto';
import { UserEntity } from './entity';

@ApiBearerAuth()
@ApiTags('user')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @Get()
  async findUsers(@Query() dto: UserQueryDto): Promise<Array<UserEntity>> {
    return await this.userService.findUsers(dto);
  }

  @Post()
  async createUser(@Body() dto: UserCreateDto): Promise<void> {
    await this.userService.createUser(dto);
  }

  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @Get('/:id')
  async findUserById(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.findUserById(id);
  }

  @Put('/:id')
  async updateUserById(
    @Param('id') id: number,
    @Body() dto: UserUpdateDto,
  ): Promise<void> {
    await this.userService.updateUserById(id, dto);
  }

  @Put('/:id/enable/:enable')
  async updateUserEnableById(
    @Param('id') id: number,
    @Param('enable') enable: boolean,
  ): Promise<void> {
    await this.userService.updateUserEnableById(id, enable);
  }

  @Put('/:id/resetPassword/:newPassword')
  async resetUserPasswordById(
    @Param('id') id: number,
    @Param('newPassword') newPassword: string,
  ): Promise<void> {
    await this.userService.resetUserPasswordById(id, newPassword);
  }
}
