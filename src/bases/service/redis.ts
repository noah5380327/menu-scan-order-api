import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from '../constant';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  async set(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async setEx(key: string, value: any, seconds: number): Promise<void> {
    await this.redisClient.setex(key, seconds, value);
  }

  async get(key: string): Promise<any> {
    return await this.redisClient.get(key);
  }
}
