import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemRepository } from './repository';
import { MenuItemController } from './controller';
import { MenuItemService } from './service';

@Module({})
export class MenuItemModule {
  static register(): DynamicModule {
    return {
      module: MenuItemModule,
      imports: [TypeOrmModule.forFeature([MenuItemRepository])],
      controllers: [MenuItemController],
      providers: [MenuItemService],
      exports: [TypeOrmModule],
    };
  }
}
