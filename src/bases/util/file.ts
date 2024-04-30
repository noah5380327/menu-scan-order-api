import * as fs from 'fs';
import { LodashUtil } from '../index';

const ignoreFileArray = ['.DS_Store'];

export const FileUtil = {
  getFileName(value: string): string {
    return value.substring(0, value.lastIndexOf('.'));
  },
  getSuffix(value: string): string {
    return value.substring(value.lastIndexOf('.') + 1, value.length);
  },
  del(path: string): void {
    fs.unlinkSync(path);
  },
  exist(path: string): boolean {
    return fs.existsSync(path);
  },
  write(path: string, data: string): void {
    fs.writeFileSync(path, data);
  },
  read(path: string, encoding?: BufferEncoding): string | Buffer {
    if (encoding) {
      return fs.readFileSync(path, { encoding }).trim();
    }
    return fs.readFileSync(path);
  },
  chmod(path: string, mode: number): void {
    fs.chmodSync(path, mode);
  },
  mkdir(path: string): void {
    fs.mkdirSync(path);
  },
  /**
   * 读取路径下所有文件并转换成对象，key为文件名，value为文件导出对象
   * @param path
   * @returns {Object}
   */
  convertToObject(path: string): Object {
    const obj = {};

    const files = fs.readdirSync(path);
    LodashUtil.pullAll(files, ignoreFileArray);

    LodashUtil.forEach(files, (f) => {
      const item = `${path}/${f}`;
      const stat = fs.statSync(item);

      if (stat.isDirectory()) {
        const array = this.convertToObject(item);

        LodashUtil.forEach(array, (value, key) => {
          obj[key] = value;
        });
      } else {
        const key = this.getFileName(f);
        obj[key] = require(`${path}/${f}`);
      }
    });

    return obj;
  },
  /**
   * 读取路径下所有文件并转换成数组
   * @param path
   * @returns {Array}
   */
  covertToArray(path: string): Array<any> {
    const arr = [];

    const files = fs.readdirSync(path);
    LodashUtil.pullAll(files, ignoreFileArray);

    LodashUtil.forEach(files, (f) => {
      const item = `${path}/${f}`;
      const stat = fs.statSync(item);

      if (stat.isDirectory()) {
        const array = this.covertToArray(item);

        LodashUtil.forEach(array, (value) => {
          arr.push(value);
        });
      } else {
        const file = require(`${path}/${f}`);
        arr.push(file);
      }
    });

    return arr;
  },
};
