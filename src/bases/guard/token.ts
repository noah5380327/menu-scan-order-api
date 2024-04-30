import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IGNORE_TOKEN_DECORATOR } from '../constant';

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ignoreToken = this.reflector.getAllAndOverride<boolean>(
      IGNORE_TOKEN_DECORATOR,
      [context.getHandler(), context.getClass()],
    );
    if (ignoreToken) {
      return true;
    }
    return super.canActivate(context);
  }
}
