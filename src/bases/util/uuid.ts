import { v4 } from 'uuid';

export const UuidUtil = {
  generate(connector?: string): string {
    connector = connector || '';

    return v4().replace(new RegExp('-', 'gm'), connector);
  },
};
