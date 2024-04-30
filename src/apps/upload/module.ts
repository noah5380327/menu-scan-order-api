import { Module, DynamicModule } from '@nestjs/common';
import { UploadController } from './controller';
import { UploadService } from './service';

@Module({})
export class UploadModule {
  static register(): DynamicModule {
    return {
      module: UploadModule,
      controllers: [UploadController],
      providers: [UploadService],
    };
  }
}
