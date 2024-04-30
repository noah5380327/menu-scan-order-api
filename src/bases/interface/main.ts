export interface MainProp {
  staticPath?: string;
  staticPrefix?: string;
  resultCodeKey?: string;
  resultMessageKey?: string;
  resultDataKey?: string;
  resultSuccessCode?: string;
  resultSuccessMessage?: string;
  resultSystemExceptionCode?: string;
  resultNotFoundExceptionCode?: string;
  resultNotFoundExceptionMessage?: string;
  resultValidateExceptionCode?: string;
  resultTokenExceptionCode?: string;
  resultTokenExceptionMessage?: string;
  resultSecurityExceptionCode?: string;
  resultSecurityExceptionMessage?: string;
  httpExceptionCode?: string;
  websocketExceptionCode?: string;
  websocketExceptionEvent?: string;
}
