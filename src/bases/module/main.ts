import {
  Module,
  Logger,
  DynamicModule,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MainProp } from '../interface';
import {
  DEFAULT_STATIC_PATH,
  DEFAULT_STATIC_PREFIX,
  DEFAULT_RESULT_KEY_CODE,
  DEFAULT_RESULT_KEY_MESSAGE,
  DEFAULT_RESULT_KEY_DATA,
  DEFAULT_RESULT_SUCCESS_CODE,
  DEFAULT_RESULT_SUCCESS_MESSAGE,
  DEFAULT_RESULT_SYSTEM_EXCEPTION_CODE,
  DEFAULT_RESULT_NOT_FOUND_EXCEPTION_CODE,
  DEFAULT_RESULT_NOT_FOUND_EXCEPTION_MESSAGE,
  DEFAULT_RESULT_VALIDATE_EXCEPTION_CODE,
  DEFAULT_RESULT_TOKEN_EXCEPTION_CODE,
  DEFAULT_RESULT_TOKEN_EXCEPTION_MESSAGE,
  DEFAULT_RESULT_SECURITY_EXCEPTION_CODE,
  DEFAULT_RESULT_SECURITY_EXCEPTION_MESSAGE,
  DEFAULT_HTTP_EXCEPTION_CODE,
  DEFAULT_WEBSOCKET_EXCEPTION_CODE,
  DEFAULT_WEBSOCKET_EXCEPTION_EVENT,
  MAIN_PROVIDE,
} from '../constant';
import { HttpExceptionFilter } from '../filter';
import { ApiInterceptor } from '../interceptor';

@Module({})
export class MainModule {
  static register(prop: MainProp): DynamicModule {
    const staticPath = prop.staticPath || DEFAULT_STATIC_PATH;
    const staticPrefix = prop.staticPrefix || DEFAULT_STATIC_PREFIX;
    const resultCodeKey = prop.resultCodeKey || DEFAULT_RESULT_KEY_CODE;
    const resultMessageKey =
      prop.resultMessageKey || DEFAULT_RESULT_KEY_MESSAGE;
    const resultDataKey = prop.resultDataKey || DEFAULT_RESULT_KEY_DATA;
    const resultSuccessCode =
      prop.resultSuccessCode || DEFAULT_RESULT_SUCCESS_CODE;
    const resultSuccessMessage =
      prop.resultSuccessMessage || DEFAULT_RESULT_SUCCESS_MESSAGE;
    const resultSystemExceptionCode =
      prop.resultSystemExceptionCode || DEFAULT_RESULT_SYSTEM_EXCEPTION_CODE;
    const resultNotFoundExceptionCode =
      prop.resultNotFoundExceptionCode ||
      DEFAULT_RESULT_NOT_FOUND_EXCEPTION_CODE;
    const resultNotFoundExceptionMessage =
      prop.resultNotFoundExceptionMessage ||
      DEFAULT_RESULT_NOT_FOUND_EXCEPTION_MESSAGE;
    const resultValidateExceptionCode =
      prop.resultValidateExceptionCode ||
      DEFAULT_RESULT_VALIDATE_EXCEPTION_CODE;
    const resultTokenExceptionCode =
      prop.resultTokenExceptionCode || DEFAULT_RESULT_TOKEN_EXCEPTION_CODE;
    const resultTokenExceptionMessage =
      prop.resultTokenExceptionMessage ||
      DEFAULT_RESULT_TOKEN_EXCEPTION_MESSAGE;
    const resultSecurityExceptionCode =
      prop.resultSecurityExceptionCode ||
      DEFAULT_RESULT_SECURITY_EXCEPTION_CODE;
    const resultSecurityExceptionMessage =
      prop.resultSecurityExceptionMessage ||
      DEFAULT_RESULT_SECURITY_EXCEPTION_MESSAGE;
    const httpExceptionCode =
      prop.httpExceptionCode || DEFAULT_HTTP_EXCEPTION_CODE;
    const websocketExceptionCode =
      prop.websocketExceptionCode || DEFAULT_WEBSOCKET_EXCEPTION_CODE;
    const websocketExceptionEvent =
      prop.websocketExceptionEvent || DEFAULT_WEBSOCKET_EXCEPTION_EVENT;

    return {
      global: true,
      module: MainModule,
      imports: [
        ServeStaticModule.forRoot({
          rootPath: join(process.cwd(), staticPath),
          serveRoot: staticPrefix,
        }),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        {
          provide: MAIN_PROVIDE,
          useValue: {
            staticPath,
            staticPrefix,
            resultCodeKey,
            resultMessageKey,
            resultDataKey,
            resultSuccessCode,
            resultSuccessMessage,
            resultSystemExceptionCode,
            resultNotFoundExceptionCode,
            resultNotFoundExceptionMessage,
            resultValidateExceptionCode,
            resultTokenExceptionCode,
            resultTokenExceptionMessage,
            resultSecurityExceptionCode,
            resultSecurityExceptionMessage,
            httpExceptionCode,
            websocketExceptionCode,
            websocketExceptionEvent,
          },
        },
        Logger,
        {
          provide: APP_INTERCEPTOR,
          useClass: ApiInterceptor,
        },
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
      ],
      exports: [MAIN_PROVIDE, Logger],
    };
  }
}
