const moment = require('moment');
const { BaseModel, Schema } = require('./BaseModel');
const { CALCULATION_METHOD, CALCULATION_NAME } = require('../constants/calculationMethods');
const { FORMULA, FORMULA_NAME } = require('../constants/formulas');

const methods = [
  CALCULATION_METHOD.manual,
  CALCULATION_METHOD.fixSum,
  CALCULATION_METHOD.formula,
  CALCULATION_METHOD.counter,
  CALCULATION_METHOD.counterScale,
];

const formulas = [FORMULA.area, FORMULA.people];

const modelDefinition = {
  startDate : { type: Date, required: true, default: moment().startOf('month').toDate() },
  service   : { type: Schema.Types.ObjectId, ref: 'Service' },
  methodID  : { type: Number, required: true, enum: methods, default: CALCULATION_METHOD.manual },
  formulaID : { type: Number, enum: formulas },
  argument  : { type: Number, min: [0, 'Area size must be positive number'] },
  rate      : { type: Number, min: [0, 'Rate must be positive number'], default: 0 },
  scale     : { type: Schema.Types.ObjectId, ref: 'Scale' },
  deleted   : { type: Boolean, default: false },
  ranges: [{
		counterMin : { type : Number, default: 0 },
    counterMax : { type : Number, default: 0 },
    rate       : { type : Number, default: 0 },
	}],
};
const baseModel   = new BaseModel('Rate', modelDefinition);
const modelSchema = baseModel.modelSchema;

modelSchema.virtual('formulaName').get( function() {
	return FORMULA_NAME[this.formulaID];
});
modelSchema.virtual('methodName').get( function() {
	return CALCULATION_NAME[this.methodID];
});
modelSchema.virtual('serviceID').get( function() {
	return this.service._id;
});
modelSchema.virtual('scaleID').get( function() {
	return Boolean(this.scale) ? this.scale._id : null;
});

const Rate = baseModel.createModel();

module.exports = Rate;
