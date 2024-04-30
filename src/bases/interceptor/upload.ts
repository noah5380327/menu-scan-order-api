import { NestInterceptor, Type } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadInterceptorOption } from '../interface';
import {
  DEFAULT_UPLOAD_FIELD_NAME,
  DEFAULT_UPLOAD_MAX_COUNT,
  DEFAULT_UPLOAD_FIELD_SIZE,
  DEFAULT_UPLOAD_FILE_SUFFIXES,
} from '../constant';
import { FileUtil, LodashUtil } from '../util';
import { HttpValidateException } from '../exception';

export function UploadInterceptor(
  option?: UploadInterceptorOption,
): Type<NestInterceptor> {
  option = option || {};
  const fieldName = option.fieldName || DEFAULT_UPLOAD_FIELD_NAME;
  const maxCount = option.maxCount || DEFAULT_UPLOAD_MAX_COUNT;
  const fieldSize = option.fieldSize || DEFAULT_UPLOAD_FIELD_SIZE;
  const fileSuffixes = option.fileSuffixes || DEFAULT_UPLOAD_FILE_SUFFIXES;

  return FilesInterceptor(fieldName, maxCount, {
    limits: {
      fieldSize,
    },
    fileFilter(
      req: any,
      file: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      },
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) {
      const fileSuffix = FileUtil.getSuffix(file.originalname);
      if (LodashUtil.indexOf(fileSuffixes, fileSuffix) === -1) {
        callback(
          new HttpValidateException(
            `${fileSuffix} file do not allow, only allow ${fileSuffixes}`,
          ),
          false,
        );
      } else {
        callback(null, true);
      }
    },
  });
}
