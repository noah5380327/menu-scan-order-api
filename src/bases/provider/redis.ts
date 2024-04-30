import { Provider } from '@nestjs/common';
import * as Redis from 'ioredis';
import { REDIS_CLIENT, REDIS_PROVIDE } from '../constant';

export const createRedisClient = (): Provider => ({
  provide: REDIS_CLIENT,
  useFactory: async (options: Redis.RedisOptions): Promise<Redis.Redis> => {
    return new Redis(options);
  },
  inject: [REDIS_PROVIDE],
});
