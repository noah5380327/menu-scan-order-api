export interface TokenProp {
  secret?: string;
  expire?: string;
  expireSecond?: number;
}

export interface TokenRule {
  code: string;
  field: string;
  expression: string;
  value: string;
}

export interface TokenPayload {
  userId: number;
  [key: string]: any;
}
