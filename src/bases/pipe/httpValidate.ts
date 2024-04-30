import { Injectable, ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpValidateException } from '../exception';

@Injectable()
export class HttpValidatePipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;
    if (this.ignoreValidate(metatype)) {
      return super.transform(value, metadata);
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const constraints = errors.map(
        (item: ValidationError) => item.constraints,
      );
      const message = this.getMessage(constraints);
      throw new HttpValidateException(message);
    }
    return super.transform(value, metadata);
  }

  ignoreValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return types.includes(metatype);
  }

  getMessage(constraints): string {
    let message = '';

    constraints.forEach((item) => {
      for (const i in item) {
        message += ' ' + item[i] + ',';
      }
    });

    if (message.indexOf(',') > -1) {
      message = message.substring(1, message.lastIndexOf(','));
    }

    return message;
  }
}
