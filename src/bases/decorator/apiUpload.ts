import { ApiBody } from '@nestjs/swagger';
import { UploadOption } from '../interface';
import {
  DEFAULT_UPLOAD_FIELD_NAME,
  DEFAULT_UPLOAD_MAX_COUNT,
} from '../constant';

export const ApiUpload =
  (option?: UploadOption): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    option = option || {};
    const fieldName = option.fieldName || DEFAULT_UPLOAD_FIELD_NAME;
    const maxCount = option.maxCount || DEFAULT_UPLOAD_MAX_COUNT;

    let properties: any = {
      type: 'string',
      format: 'binary',
    };

    if (maxCount > 1) {
      properties = {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      };
    }

    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldName]: properties,
        },
      },
    })(target, propertyKey, descriptor);
  };
