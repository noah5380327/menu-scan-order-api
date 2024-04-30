import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MenuService } from './service';
import { MenuCreateDto, MenuQueryDto, MenuUpdateDto } from './dto';
import { MenuEntity } from './entity';
import { TokenPayload, TokenSubject } from 'src/bases';

@ApiBearerAuth()
@ApiTags('menu')
@Controller('/menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findMenus(
    @Query() dto: MenuQueryDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<Array<MenuEntity>> {
    return await this.menuService.findMenus(dto, tokenSubject);
  }

  @Post()
  async createMenu(
    @Body() dto: MenuCreateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.menuService.createMenu(dto, tokenSubject);
  }

  @Get('/:id')
  async findMenuById(@Param('id') id: number): Promise<MenuEntity> {
    return await this.menuService.findMenuById(id);
  }

  @Put('/:id')
  async updateMenuById(
    @Param('id') id: number,
    @Body() dto: MenuUpdateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.menuService.updateMenuById(id, dto, tokenSubject);
  }

  @Put('/:id/enable/:enable')
  async updateMenuEnableById(
    @Param('id') id: number,
    @Param('enable') enable: boolean,
  ): Promise<void> {
    await this.menuService.updateMenuEnableById(id, enable);
  }

  @Delete('/:id')
  async deleteMenuById(@Param('id') id: number): Promise<void> {
    await this.menuService.deleteMenuById(id);
  }
}
