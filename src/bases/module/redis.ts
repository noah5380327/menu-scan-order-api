import { DynamicModule, Module } from '@nestjs/common';
import { RedisOptions } from 'ioredis';
import { REDIS_PROVIDE } from '../constant';
import { RedisService } from '../service';
import { createRedisClient } from '../provider';

@Module({})
export class RedisModule {
  static register(prop: RedisOptions): DynamicModule {
    return {
      global: true,
      module: RedisModule,
      providers: [
        { provide: REDIS_PROVIDE, useValue: prop },
        createRedisClient(),
        RedisService,
      ],
      exports: [REDIS_PROVIDE, RedisService],
    };
  }
}
