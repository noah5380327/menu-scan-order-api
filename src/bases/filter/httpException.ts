import {
  Catch,
  ExceptionFilter as BaseExceptionFilter,
  Logger,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { MAIN_PROVIDE } from '../constant';
import { MainProp } from '../interface';
import { HttpException, HttpValidateException } from '../exception';
import { ApiUtil, MessageUtil } from '../util';

@Catch()
export class HttpExceptionFilter implements BaseExceptionFilter {
  constructor(
    @Inject(MAIN_PROVIDE) private readonly mainProp: MainProp,
    private readonly logger: Logger,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let result = ApiUtil.systemException(this.mainProp, exception.message);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      result = ApiUtil.httpException(this.mainProp, exception.message);
    } else if (exception instanceof NotFoundException) {
      this.logger.log(MessageUtil.httpStart(request));
      status = exception.getStatus();
      result = ApiUtil.notFoundException(this.mainProp);
    } else if (exception instanceof HttpValidateException) {
      status = exception.getStatus();
      result = ApiUtil.validateException(this.mainProp, exception.message);
    } else if (exception instanceof UnauthorizedException) {
      this.logger.log(MessageUtil.httpStart(request));
      status = exception.getStatus();
      result = ApiUtil.tokenException(this.mainProp);
    } else if (exception instanceof ForbiddenException) {
      this.logger.log(MessageUtil.httpStart(request));
      status = exception.getStatus();
      result = ApiUtil.securityException(this.mainProp);
    }

    this.logger.error(exception);
    response.status(status).json(result);
    this.logger.log(MessageUtil.httpFinish(request));
  }
}
