import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRepository } from './repository';
import { StaffController } from './controller';
import { StaffService } from './service';

@Module({})
export class StaffModule {
  static register(): DynamicModule {
    return {
      module: StaffModule,
      imports: [TypeOrmModule.forFeature([StaffRepository])],
      controllers: [StaffController],
      providers: [StaffService],
      exports: [TypeOrmModule],
    };
  }
}
