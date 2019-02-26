const Formatter = require('../helpers/Formatter');
const { BaseModel, Schema } = require('./BaseModel');
const { maxCounterValue } = require('../config');

const modelDefinition = {
	service: { type : Schema.Types.ObjectId, ref : 'Service' },
	range: [{
		counterMin : { type : Number, default: 0 },
		counterMax : { type : Number, default: 0 },
	}],
	deleted: { type : Boolean, default: false },
};

const baseModel   = new BaseModel('Scale', modelDefinition);
const modelSchema = baseModel.modelSchema;

modelSchema.virtual('name').get( function() {
	const range = this.range.map( range => {
		const max = (range.counterMax !== maxCounterValue) ? range.counterMax : '..';
		return `${range.counterMin} - ${max}`;
	});

	return range.join(' / ');
});
modelSchema.virtual('serviceID').get( function() {
	return this.service._id;
});

const Scale = baseModel.createModel();

module.exports = Scale;
