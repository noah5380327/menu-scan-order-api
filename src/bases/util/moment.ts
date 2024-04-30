import * as moment from 'moment';
import {
  AddDaysOption,
  AddSecondsOption,
  CustomFormatOption,
  MinusDaysOption,
  MinusSecondsOption,
} from '../interface';

export const MomentUtil = {
  ...moment,
  currentMoment: moment,
  dateTimeFormat: (value?: any): string => {
    const formatter = 'YYYY-MM-DD HH:mm:ss';
    if (value) {
      return moment(value).format(formatter);
    }
    return moment().format(formatter);
  },
  dateFormat: (value?: any): string => {
    const formatter = 'YYYY-MM-DD';
    if (value) {
      return moment(value).format(formatter);
    }
    return moment().format(formatter);
  },
  timeFormat: (value?: any): string => {
    const formatter = 'HH:mm:ss';
    if (value) {
      return moment(value).format(formatter);
    }
    return moment().format(formatter);
  },
  customFormat: (option?: CustomFormatOption): string => {
    option = option || {};
    const value = option.value || '';
    const formatter = option.formatter || 'YYYY/MM/DD';
    if (value) {
      return moment(value).format(formatter);
    }
    return moment().format(formatter);
  },
  addDays(option?: AddDaysOption) {
    option = option || {};
    const value = option.value || '';
    const days = option.days || 1;
    if (value) {
      return moment(value).add(days, 'days');
    }
    return moment().add(days, 'days');
  },
  minusDays(option?: MinusDaysOption) {
    option = option || {};
    const value = option.value || '';
    const days = option.days || 1;
    if (value) {
      return moment(value).subtract(days, 'days');
    }
    return moment().subtract(days, 'days');
  },
  addSeconds(option?: AddSecondsOption) {
    option = option || {};
    const value = option.value || '';
    const seconds = option.seconds || 1;
    if (value) {
      return moment(value).add(seconds, 'seconds');
    }
    return moment().add(seconds, 'seconds');
  },
  minusSeconds(option?: MinusSecondsOption) {
    option = option || {};
    const value = option.value || '';
    const seconds = option.seconds || 1;
    if (value) {
      return moment(value).subtract(seconds, 'seconds');
    }
    return moment().subtract(seconds, 'seconds');
  },
};
