export interface CustomFormatOption {
  value?: any;
  formatter?: string;
}

export interface AddDaysOption {
  value?: any;
  days?: number;
}

export interface MinusDaysOption extends AddDaysOption {}

export interface AddSecondsOption {
  value?: any;
  seconds?: number;
}

export interface MinusSecondsOption extends AddSecondsOption {}
