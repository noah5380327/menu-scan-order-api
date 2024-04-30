export interface BootProp {
  cors?: boolean;
  port?: number;
  apiPrefix?: string;
  logLevel?: string;
  logFileDirectory?: string;
  logFilePrefix?: string;
  logFilePattern?: string;
  logFileMaxSize?: string;
  logFileLabel?: string;
  docDisabled?: boolean;
  docTitle?: string;
  docDesc?: string;
  docVersion?: string;
  bodyParserLimit?: string;
  enableImplicitConversion?: boolean;
  appModule: any;
}
