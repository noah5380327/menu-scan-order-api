import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repository';
import { OrderController } from './controller';
import { OrderService } from './service';

@Module({})
export class OrderModule {
  static register(): DynamicModule {
    return {
      module: OrderModule,
      imports: [TypeOrmModule.forFeature([OrderRepository])],
      controllers: [OrderController],
      providers: [OrderService],
      exports: [TypeOrmModule],
    };
  }
}
