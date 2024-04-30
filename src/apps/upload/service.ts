import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { UuidUtil } from 'src/bases';

@Injectable()
export class UploadService {
  startUpload(file: Express.Multer.File): string {
    const filename = `/static/upload/${UuidUtil.generate()}-${
      file.originalname
    }`;
    const path = `${process.cwd()}${filename}`;
    fs.writeFileSync(path, file.buffer);
    return filename;
  }
}
