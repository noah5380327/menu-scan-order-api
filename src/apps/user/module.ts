import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository';
import { UserController } from './controller';
import { UserService } from './service';

@Module({})
export class UserModule {
  static register(): DynamicModule {
    return {
      module: UserModule,
      imports: [TypeOrmModule.forFeature([UserRepository])],
      controllers: [UserController],
      providers: [UserService],
      exports: [TypeOrmModule],
    };
  }
}
