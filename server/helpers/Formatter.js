const moment = require('moment');
const numeral = require('numeral');
const { FORMATS } = require('../constants/formats');

numeral.register('locale', 'ua', {
  delimiters: {
      thousands: ' ',
      decimal: '.'
  },
  abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
  },
  currency: {
      symbol: 'UAH'
  }
});

// switch between locales
numeral.locale('ua');

class Formatter {

  static date(rawValue = '') {
    const timestamp = moment(rawValue).valueOf();
    const result    = moment(timestamp).format(FORMATS.date);

    return result;
  };

  static dateTime(rawValue = '') {
    const timestamp = moment(rawValue).valueOf();
    const result    = moment(timestamp).format(FORMATS.dateTime);

    return result;
  };

  static decimal(rawValue = 0) {
    return numeral(rawValue).format(FORMATS.decimal);
  };

  static sum(rawValue = 0) {
    return numeral(rawValue).format(FORMATS.sum);
  };

  static finance(rawValue = 0) {
    return numeral(rawValue).format(FORMATS.finance);
  };
};

module.exports = Formatter;