import { Body, Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IgnoreToken } from 'src/bases';
import { CommonService } from './service';
import { CommonLoginDto, CommonRegisterDto, CommonStaffLoginDto } from './dto';
import { CommonLoginVo } from './vo';

@ApiBearerAuth()
@ApiTags('common')
@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @IgnoreToken()
  @Get()
  get(): string {
    return this.commonService.get();
  }

  @IgnoreToken()
  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @Post('/login')
  async login(@Body() dto: CommonLoginDto): Promise<CommonLoginVo> {
    return await this.commonService.login(dto);
  }

  @IgnoreToken()
  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @Post('/register')
  async register(@Body() dto: CommonRegisterDto): Promise<CommonLoginVo> {
    return await this.commonService.register(dto);
  }

  @IgnoreToken()
  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @Post('/staff/login')
  async staffLogin(@Body() dto: CommonStaffLoginDto): Promise<CommonLoginVo> {
    return await this.commonService.staffLogin(dto);
  }
}
