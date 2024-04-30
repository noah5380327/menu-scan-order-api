export interface UploadOption {
  fieldName?: string;
  maxCount?: number;
}

export interface UploadInterceptorOption extends UploadOption {
  fieldSize?: number;
  fileSuffixes?: Array<string>;
}
