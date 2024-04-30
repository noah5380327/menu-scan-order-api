import { createCipheriv, createDecipheriv, scrypt, createHash } from 'crypto';
import { promisify } from 'util';
import { DigestOption } from '../interface';

const defaultSalt = 'dovejs-salt';
const defaultIv = 'dovejs-iv-012345'; // must 16 size length

export const DigestUtil = {
  async encode(value: string, option?: DigestOption): Promise<string> {
    option = option || {};
    const salt = option.salt || defaultSalt;
    const iv = option.iv || defaultIv;
    const key = (await promisify(scrypt)(salt, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    return Buffer.concat([cipher.update(value), cipher.final()]).toString(
      'binary',
    );
  },
  async decode(value: string, option?: DigestOption): Promise<string> {
    option = option || {};
    const salt = option.salt || defaultSalt;
    const iv = option.iv || defaultIv;
    const key = (await promisify(scrypt)(salt, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    return Buffer.concat([
      decipher.update(Buffer.from(value, 'binary')),
      decipher.final(),
    ]).toString('binary');
  },
  md5(str: string, count: number): string {
    if (arguments.length === 1) {
      count = 1;
    }
    for (let i = 0; i < count; i++) {
      str = createHash('md5').update(str).digest('hex');
    }
    return str;
  },
  hash(str: string, algorithm?: string): string {
    algorithm = algorithm || 'sha256';
    return createHash(algorithm).update(str).digest('hex');
  },
};
