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
import { TableService } from './service';
import { TableCreateDto, TableQueryDto, TableUpdateDto } from './dto';
import { TableEntity } from './entity';
import { TokenPayload, TokenSubject } from 'src/bases';

@ApiBearerAuth()
@ApiTags('table')
@Controller('/tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  async findTables(
    @Query() dto: TableQueryDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<Array<TableEntity>> {
    return await this.tableService.findTables(dto, tokenSubject);
  }

  @Post()
  async createTable(
    @Body() dto: TableCreateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.tableService.createTable(dto, tokenSubject);
  }

  @Get('/:id')
  async findTableById(@Param('id') id: number): Promise<TableEntity> {
    return await this.tableService.findTableById(id);
  }

  @Put('/:id')
  async updateTableById(
    @Param('id') id: number,
    @Body() dto: TableUpdateDto,
    @TokenSubject() tokenSubject: TokenPayload,
  ): Promise<void> {
    await this.tableService.updateTableById(id, dto, tokenSubject);
  }

  @Put('/:id/enable/:enable')
  async updateTableEnableById(
    @Param('id') id: number,
    @Param('enable') enable: boolean,
  ): Promise<void> {
    await this.tableService.updateTableEnableById(id, enable);
  }

  @Delete('/:id')
  async deleteTableById(@Param('id') id: number): Promise<void> {
    await this.tableService.deleteTableById(id);
  }
}
