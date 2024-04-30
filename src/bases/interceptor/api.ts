import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MAIN_PROVIDE, IGNORE_API_STRUCTURE_DECORATOR } from '../constant';
import { MainProp } from '../interface';
import { ApiUtil, MessageUtil } from '../util';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  constructor(
    @Inject(MAIN_PROVIDE) private readonly mainProp: MainProp,
    private readonly reflector: Reflector,
    private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ignoreApiStructure = this.reflector.getAllAndOverride<boolean>(
      IGNORE_API_STRUCTURE_DECORATOR,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    this.logger.log(MessageUtil.httpStart(request));

    return next.handle().pipe(
      map((data) => {
        let result = ApiUtil.success(this.mainProp, data);
        if (ignoreApiStructure) {
          result = data || '';
        }

        const resultStr = JSON.stringify(result);
        this.logger.log(MessageUtil.httpFinish(request, resultStr));

        return result;
      }),
    );
  }
}
