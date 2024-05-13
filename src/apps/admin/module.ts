import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './repository';

@Module({})
export class AdminModule {
  static register(): DynamicModule {
    return {
      module: AdminModule,
      imports: [TypeOrmModule.forFeature([AdminRepository])],
      exports: [TypeOrmModule],
    };
  }
}
