import { Body, Controller, Get, Post, Query, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MenuItemService } from './service';
import { MenuItemCreateDto, MenuItemQueryDto, MenuItemDeleteDto } from './dto';
import { MenuItemEntity } from './entity';
import { TokenPayload, TokenSubject } from 'src/bases';

@ApiBearerAuth()
@ApiTags('menuItem')
@Controller('/menuItems')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  async findMenuItems(
    @Query() dto: MenuItemQueryDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<Array<MenuItemEntity>> {
    return await this.menuItemService.findMenuItems(dto, tokenSubject);
  }

  @Post()
  async createMenuItem(
    @Body() dto: MenuItemCreateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.menuItemService.createMenuItem(dto, tokenSubject);
  }

  @Delete()
  async deleteMenuItemById(@Body() dto: MenuItemDeleteDto): Promise<void> {
    await this.menuItemService.deleteMenuItem(dto);
  }
}
