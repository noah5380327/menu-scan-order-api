import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMenuItemRepository } from './repository';
import { OrderMenuItemController } from './controller';
import { OrderMenuItemService } from './service';

@Module({})
export class OrderMenuItemModule {
  static register(): DynamicModule {
    return {
      module: OrderMenuItemModule,
      imports: [TypeOrmModule.forFeature([OrderMenuItemRepository])],
      controllers: [OrderMenuItemController],
      providers: [OrderMenuItemService],
      exports: [TypeOrmModule],
    };
  }
}
