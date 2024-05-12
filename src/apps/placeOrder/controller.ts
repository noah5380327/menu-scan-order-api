import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlaceOrderService } from './service';
import { TableEntity } from '../table/entity';
import { MenuEntity } from '../menu/entity';
import { ItemEntity } from '../item/entity';
import { IgnoreToken } from '../../bases';
import { PlaceOrderCreateDto } from './dto';

@ApiBearerAuth()
@ApiTags('placeOrder')
@Controller('/placeOrders')
export class PlaceOrderController {
  constructor(private readonly placeOrderService: PlaceOrderService) {}

  @IgnoreToken()
  @Get('/tables/:tableId')
  async findTable(@Param('tableId') tableId: number): Promise<TableEntity> {
    return await this.placeOrderService.findTable(tableId);
  }

  @IgnoreToken()
  @Get('/users/:userId/menus')
  async findMenus(@Param('userId') userId: number): Promise<Array<MenuEntity>> {
    return await this.placeOrderService.findMenus(userId);
  }

  @IgnoreToken()
  @Get('/menus/:menuId/items')
  async findItems(@Param('menuId') menuId: number): Promise<Array<ItemEntity>> {
    return await this.placeOrderService.findItems(menuId);
  }

  @IgnoreToken()
  @Post()
  async createOrder(@Body() dto: PlaceOrderCreateDto): Promise<void> {
    await this.placeOrderService.createOrder(dto);
  }
}
