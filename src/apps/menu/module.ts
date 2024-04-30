import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRepository } from './repository';
import { MenuController } from './controller';
import { MenuService } from './service';

@Module({})
export class MenuModule {
  static register(): DynamicModule {
    return {
      module: MenuModule,
      imports: [TypeOrmModule.forFeature([MenuRepository])],
      controllers: [MenuController],
      providers: [MenuService],
      exports: [TypeOrmModule],
    };
  }
}
