import moment from 'moment';
import numaral from 'numeral';
import { toInteger, toNumber } from 'lodash';
import { FORMATS } from '../constants/common';

class Formatter {

  createMoment(value = null) {
    try {
      return value ? moment(new Date(value)) : moment(new Date());
    } catch (error) {
      console.log('Formatter: invalid date: ', value);
    }

    return moment();
  }

  formatDate(value, format) {
    try {
      return moment(value).format(format);
    } catch (error) {
      return 'Invalid date';
    }
  }

  date(value) {
    return this.formatDate(value, FORMATS.date);
  }

  dateTime(value) {
    return this.formatDate(value, FORMATS.dateTime);
  }

  dateTimeFull(value) {
    return this.formatDate(value, FORMATS.dateTimeFull);
  }

  startDay(value = null, format = FORMATS.dateTimeFull) {
    return this.createMoment(value).startOf('day').format(format);
  }

  startMonth(value, format = FORMATS.date) {
    return this.createMoment(value).startOf('month').format(format);
  }

  startYear(value, format = FORMATS.date) {
    return this.createMoment(value).startOf('year').format(format);
  }

  startPreviousMonth(value, format = FORMATS.date) {
    return this.createMoment(value).subtract(1, 'month').startOf('month').format(format);
  }

  sum(value) {
    return numaral(value).format(FORMATS.sum);
  }

  integer(value) {
    return toInteger(value);
  }

  number(value) {
    return toNumber(value);
  }
}

export default new Formatter();
