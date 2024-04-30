import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './repository';
import { ItemController } from './controller';
import { ItemService } from './service';

@Module({})
export class ItemModule {
  static register(): DynamicModule {
    return {
      module: ItemModule,
      imports: [TypeOrmModule.forFeature([ItemRepository])],
      controllers: [ItemController],
      providers: [ItemService],
      exports: [TypeOrmModule],
    };
  }
}
