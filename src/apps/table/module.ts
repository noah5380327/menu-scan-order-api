import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableRepository } from './repository';
import { TableController } from './controller';
import { TableService } from './service';

@Module({})
export class TableModule {
  static register(): DynamicModule {
    return {
      module: TableModule,
      imports: [TypeOrmModule.forFeature([TableRepository])],
      controllers: [TableController],
      providers: [TableService],
      exports: [TypeOrmModule],
    };
  }
}
