import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemRepository } from './repository';

@Module({})
export class MenuItemModule {
  static register(): DynamicModule {
    return {
      module: MenuItemModule,
      imports: [TypeOrmModule.forFeature([MenuItemRepository])],
      exports: [TypeOrmModule],
    };
  }
}
