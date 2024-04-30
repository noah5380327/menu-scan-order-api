import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SerializeOptions
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StaffService } from './service';
import { StaffCreateDto, StaffQueryDto, StaffUpdateDto } from './dto';
import { StaffEntity } from './entity';
import { TokenPayload, TokenSubject } from '../../bases';

@ApiBearerAuth()
@ApiTags('staff')
@Controller('/staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @Get()
  async findStaffs(
    @Query() dto: StaffQueryDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<Array<StaffEntity>> {
    return await this.staffService.findStaffs(dto, tokenSubject);
  }

  @Post()
  async createStaff(
    @Body() dto: StaffCreateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.staffService.createStaff(dto, tokenSubject);
  }

  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @Get('/:id')
  async findStaffById(@Param('id') id: number): Promise<StaffEntity> {
    return await this.staffService.findStaffById(id);
  }

  @Put('/:id')
  async updateStaffById(
    @Param('id') id: number,
    @Body() dto: StaffUpdateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.staffService.updateStaffById(id, dto, tokenSubject);
  }

  @Put('/:id/enable/:enable')
  async updateStaffEnableById(
    @Param('id') id: number,
    @Param('enable') enable: boolean,
  ): Promise<void> {
    await this.staffService.updateStaffEnableById(id, enable);
  }

  @Put('/:id/resetPassword/:newPassword')
  async resetStaffPasswordById(
    @Param('id') id: number,
    @Param('newPassword') newPassword: string,
  ): Promise<void> {
    await this.staffService.resetStaffPasswordById(id, newPassword);
  }

  @Delete('/:id')
  async deleteStaffById(@Param('id') id: number): Promise<void> {
    await this.staffService.deleteStaffById(id);
  }
}
