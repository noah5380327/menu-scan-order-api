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
import { ItemService } from './service';
import { ItemCreateDto, ItemQueryDto, ItemUpdateDto } from './dto';
import { ItemEntity } from './entity';
import { TokenPayload, TokenSubject } from 'src/bases';

@ApiBearerAuth()
@ApiTags('item')
@Controller('/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findItems(
    @Query() dto: ItemQueryDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<Array<ItemEntity>> {
    return await this.itemService.findItems(dto, tokenSubject);
  }

  @Post()
  async createItem(
    @Body() dto: ItemCreateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.itemService.createItem(dto, tokenSubject);
  }

  @Get('/:id')
  async findItemById(@Param('id') id: number): Promise<ItemEntity> {
    return await this.itemService.findItemById(id);
  }

  @Put('/:id')
  async updateItemById(
    @Param('id') id: number,
    @Body() dto: ItemUpdateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.itemService.updateItemById(id, dto, tokenSubject);
  }

  @Put('/:id/enable/:enable')
  async updateItemEnableById(
    @Param('id') id: number,
    @Param('enable') enable: boolean,
  ): Promise<void> {
    await this.itemService.updateItemEnableById(id, enable);
  }

  @Delete('/:id')
  async deleteItemById(@Param('id') id: number): Promise<void> {
    await this.itemService.deleteItemById(id);
  }
}
