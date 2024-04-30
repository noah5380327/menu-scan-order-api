import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { TokenProp } from '../interface';
import { TokenService } from '../service';
import { TokenStrategy } from '../strategy';
import {
  DEFAULT_TOKEN_SECRET,
  DEFAULT_TOKEN_EXPIRE,
  DEFAULT_TOKEN_EXPIRE_SECOND,
  TOKEN_PROVIDE,
} from '../constant';
import { TokenGuard } from '../guard';

@Module({})
export class TokenModule {
  static register(prop: TokenProp): DynamicModule {
    const secret = prop.secret || DEFAULT_TOKEN_SECRET;
    const expire = prop.expire || DEFAULT_TOKEN_EXPIRE;
    const expireSecond = prop.expireSecond || DEFAULT_TOKEN_EXPIRE_SECOND;

    return {
      global: true,
      module: TokenModule,
      imports: [
        PassportModule,
        JwtModule.register({
          secret,
          signOptions: { expiresIn: expire },
        }),
      ],
      providers: [
        TokenService,
        {
          provide: TOKEN_PROVIDE,
          useValue: {
            secret,
            expire,
            expireSecond,
          },
        },
        TokenStrategy,
        {
          provide: APP_GUARD,
          useClass: TokenGuard,
        },
      ],
      exports: [TokenService],
    };
  }
}
