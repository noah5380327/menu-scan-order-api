import { bootstrap } from 'src/bases';
import { CommonModule } from './apps/common/module';

bootstrap({
  cors: true,
  port: parseInt(process.env.HTTP_PORT),
  apiPrefix: process.env.BASE_PATH,
  logFilePrefix: process.env.LOG_FILE_PREFIX,
  appModule: CommonModule,
  enableImplicitConversion: true,
});
