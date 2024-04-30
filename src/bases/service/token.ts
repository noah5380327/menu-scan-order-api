import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_PROVIDE } from '../constant';
import { TokenPayload, TokenProp } from '../interface';
import { RedisService } from './redis';

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_PROVIDE) private readonly tokenProp: TokenProp,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async sign(payload: TokenPayload): Promise<string> {
    await this.redisService.setEx(
      String(payload.userId),
      JSON.stringify(payload),
      this.tokenProp.expireSecond,
    );
    return this.jwtService.sign(payload);
  }
}
