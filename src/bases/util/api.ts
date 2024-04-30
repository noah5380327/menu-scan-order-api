import { MainProp } from '../interface';

export const ApiUtil = {
  success: (mainProp: MainProp, data: any): any => {
    const result = {};
    result[mainProp.resultCodeKey] = mainProp.resultSuccessCode;
    result[mainProp.resultMessageKey] = mainProp.resultSuccessMessage;
    result[mainProp.resultDataKey] = data || '';
    return result;
  },
  systemException: (mainProp: MainProp, message: string): any => {
    const result = {};
    result[mainProp.resultCodeKey] = mainProp.resultSystemExceptionCode;
    result[mainProp.resultMessageKey] = message;
    result[mainProp.resultDataKey] = '';
    return result;
  },
  httpException: (mainProp: MainProp, message: string): any => {
    const result = {};
    result[mainProp.resultCodeKey] = mainProp.httpExceptionCode;
    result[mainProp.resultMessageKey] = message;
    result[mainProp.resultDataKey] = '';
    return result;
  },
  notFoundException: (mainProp: MainProp): any => {
    const result = {};
    result[mainProp.resultCodeKey] = mainProp.resultNotFoundExceptionCode;
    result[mainProp.resultMessageKey] = mainProp.resultNotFoundExceptionMessage;
    result[mainProp.resultDataKey] = '';
    return result;
  },
  validateException: (mainProp: MainProp, message: string): any => {
    const result = {};
    result[mainProp.resultCodeKey] = mainProp.resultValidateExceptionCode;
    result[mainProp.resultMessageKey] = message;
    result[mainProp.resultDataKey] = '';
    return result;
  },
  tokenException: (mainProp: MainProp): any => {
    const result = {};
    result[mainProp.resultCodeKey] = mainProp.resultTokenExceptionCode;
    result[mainProp.resultMessageKey] = mainProp.resultTokenExceptionMessage;
    result[mainProp.resultDataKey] = '';
    return result;
  },
  securityException: (mainProp: MainProp): any => {
    const result = {};
    result[mainProp.resultCodeKey] = mainProp.resultSecurityExceptionCode;
    result[mainProp.resultMessageKey] = mainProp.resultSecurityExceptionMessage;
    result[mainProp.resultDataKey] = '';
    return result;
  },
};
