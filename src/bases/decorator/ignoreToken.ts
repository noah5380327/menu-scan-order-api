import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { IGNORE_TOKEN_DECORATOR } from '../constant';

export const IgnoreToken = (): CustomDecorator =>
  SetMetadata(IGNORE_TOKEN_DECORATOR, true);
