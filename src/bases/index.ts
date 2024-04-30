import { NestFactory } from '@nestjs/core';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';
import { urlencoded, json } from 'express';
import * as helmet from 'helmet';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { BootProp, TokenPayload, TokenRule } from './interface';
import {
  DEFAULT_CORS,
  DEFAULT_PORT,
  DEFAULT_API_PREFIX,
  DEFAULT_LOG_LEVEL,
  DEFAULT_LOG_FILE_DIRECTORY,
  DEFAULT_LOG_FILE_PREFIX,
  DEFAULT_LOG_FILE_PATTERN,
  DEFAULT_LOG_FILE_MAX_SIZE,
  DEFAULT_LOG_FILE_LABEL,
  DEFAULT_DOC_DISABLED,
  DEFAULT_DOC_TITLE,
  DEFAULT_DOC_DESC,
  DEFAULT_DOC_VERSION,
  DEFAULT_BODY_PARSER_LIMIT,
  DEFAULT_ENABLE_IMPLICIT_CONVERSION,
} from './constant';
import { MainModule, TokenModule, RedisModule } from './module';
import {
  MomentUtil,
  LodashUtil,
  UuidUtil,
  DigestUtil,
  FileUtil,
} from './util';
import { HttpException } from './exception';
import { HttpValidatePipe } from './pipe';
import {
  IgnoreToken,
  TokenSubject,
  ApiUpload,
  IgnoreApiStructure,
} from './decorator';
import { TokenService, RedisService } from './service';
import { PaginationDto } from './dto';
import { UploadInterceptor } from './interceptor';
import { BaseEntity } from './entity';

export async function bootstrap(prop: BootProp) {
  const cors = prop.cors || DEFAULT_CORS;
  const port = prop.port || DEFAULT_PORT;
  const apiPrefix = prop.apiPrefix || DEFAULT_API_PREFIX;
  const logLevel = prop.logLevel || DEFAULT_LOG_LEVEL;
  const logFileDirectory = prop.logFileDirectory || DEFAULT_LOG_FILE_DIRECTORY;
  const logFilePrefix = prop.logFilePrefix || DEFAULT_LOG_FILE_PREFIX;
  const logFilePattern = prop.logFilePattern || DEFAULT_LOG_FILE_PATTERN;
  const logFileMaxSize = prop.logFileMaxSize || DEFAULT_LOG_FILE_MAX_SIZE;
  const logFileLabel = prop.logFileLabel || DEFAULT_LOG_FILE_LABEL;
  const docDisabled = prop.docDisabled || DEFAULT_DOC_DISABLED;
  const docTitle = prop.docTitle || DEFAULT_DOC_TITLE;
  const docDesc = prop.docDesc || DEFAULT_DOC_DESC;
  const docVersion = prop.docVersion || DEFAULT_DOC_VERSION;
  const bodyParserLimit = prop.bodyParserLimit || DEFAULT_BODY_PARSER_LIMIT;
  const enableImplicitConversion =
    prop.enableImplicitConversion || DEFAULT_ENABLE_IMPLICIT_CONVERSION;
  const appModule = prop.appModule;

  const app = await NestFactory.create(appModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: logLevel,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          level: logLevel,
          dirname: join(process.cwd(), logFileDirectory),
          filename: `${logFilePrefix}-%DATE%.log`,
          datePattern: logFilePattern,
          maxSize: logFileMaxSize,
          format: winston.format.combine(
            winston.format.label({ label: logFileLabel }),
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.printf(
              ({ label, timestamp, level, context, message, ms }) => {
                return `[${label}] ${process.pid} ${MomentUtil.dateTimeFormat(
                  timestamp,
                )} ${level.toUpperCase()} ${
                  context ? `[${context}] ` : ''
                }${message} ${ms}`;
              },
            ),
          ),
        }),
      ],
    }),
  });

  app.use(json({ limit: bodyParserLimit }));
  app.use(urlencoded({ extended: true, limit: bodyParserLimit }));

  if (cors) {
    app.enableCors();
  }

  app.use(
    helmet({
      contentSecurityPolicy: docDisabled,
    }),
  );

  app.enableVersioning();

  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new HttpValidatePipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion },
    }),
  );

  if (!docDisabled) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(docTitle)
      .setDescription(docDesc)
      .setVersion(docVersion)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };
    SwaggerModule.setup(apiPrefix, app, document, customOptions);
  }

  await app.listen(port);
}

export {
  MainModule,
  MomentUtil,
  HttpException,
  TokenModule,
  IgnoreToken,
  TokenSubject,
  TokenService,
  TokenPayload,
  TokenRule,
  RedisModule,
  RedisService,
  LodashUtil,
  UuidUtil,
  DigestUtil,
  FileUtil,
  PaginationDto,
  ApiUpload,
  UploadInterceptor,
  BaseEntity,
  IgnoreApiStructure,
};
