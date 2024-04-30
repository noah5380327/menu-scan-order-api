import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TOKEN_PROVIDE } from '../constant';
import { TokenPayload, TokenProp } from '../interface';
import { RedisService } from '../service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TOKEN_PROVIDE) private readonly tokenProp: TokenProp,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: tokenProp.secret,
    });
  }

  async validate(payload: TokenPayload): Promise<TokenPayload> {
    const userId = String(payload.userId);
    const redisValue = await this.redisService.get(userId);
    if (!redisValue) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
