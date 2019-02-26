const moment = require('moment');
const isArray = require('lodash/isArray');
const Formatter = require('../helpers/Formatter');
const { BaseModel, Schema } = require('./BaseModel');
const { CALCULATION_STATUS, CALCULATION_STATUS_NAME } = require('../constants/calculationStatus');
const { maxCounterValue } = require('../config');

const modelDefinition = {
  period         : { type : Date, required: true, default: moment(new Date()).startOf('month').toDate() },
  createDate     : { type : Date, required: true, default: new Date() },
  service        : { type : Schema.Types.ObjectId, ref : 'Service' },
  rate           : { type : Schema.Types.ObjectId, ref : 'Rate' },
  deleted        : { type : Boolean, default: false },
  counterMin     : { type : Number, default: 0 },
  counterMax     : { type : Number, default: 0 },
  calcResult     : { type : Number, default: 0 },
  calcResultHint : { type : String, default: '' },
  paymentSum     : { type : Number, default: 0 },
  comment        : { type : String, default: '' },
  statusID       : { type : Number, default: CALCULATION_STATUS.prepared },
};
const baseModel   = new BaseModel('Calculation', modelDefinition);
const modelSchema = baseModel.modelSchema;

modelSchema.virtual('info').get( function() {
  const period     = Formatter.date(this.period);
  const calcResult = Formatter.finance(this.calcResult);
  const paymentSum = Formatter.finance(this.paymentSum);
  const service    = this.service.name;
  const status     = CALCULATION_STATUS_NAME[this.statusID];
	return `${period}: ${service} ${calcResult} (${paymentSum}) - ${status}`;
});
modelSchema.virtual('serviceID').get( function() {
	return this.service._id;
});
modelSchema.virtual('rateID').get( function() {
	return this.rate._id;
});
modelSchema.virtual('scaleInfo').get( function() {
  if (!isArray(this.rate.ranges)) {
    return '';
  };

  const range = this.rate.ranges.map( range => {
    const max = (range.counterMax !== maxCounterValue) ? range.counterMax : '';
    const rate = Formatter.finance(range.rate);
		return `${range.counterMin}-${max}: ${rate}`;
	});

	return range.join(' / ');
});

const Calculation = baseModel.createModel();

module.exports = Calculation;
