import cryptoRandomString from 'crypto-random-string';

module.exports = {
  generate(length?: number): string {
    length = length || 4;
    return cryptoRandomString({ length });
  },
};
