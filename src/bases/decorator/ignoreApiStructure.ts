import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { IGNORE_API_STRUCTURE_DECORATOR } from '../constant';

export const IgnoreApiStructure = (): CustomDecorator =>
  SetMetadata(IGNORE_API_STRUCTURE_DECORATOR, true);
