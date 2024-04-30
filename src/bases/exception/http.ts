import { HttpException as BaseHttpException, HttpStatus } from '@nestjs/common';

export class HttpException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
