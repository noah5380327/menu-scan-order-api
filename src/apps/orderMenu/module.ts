import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMenuRepository } from './repository';
import { OrderMenuController } from './controller';
import { OrderMenuService } from './service';

@Module({})
export class OrderMenuModule {
  static register(): DynamicModule {
    return {
      module: OrderMenuModule,
      imports: [TypeOrmModule.forFeature([OrderMenuRepository])],
      controllers: [OrderMenuController],
      providers: [OrderMenuService],
      exports: [TypeOrmModule],
    };
  }
}
