const mongoose = require('mongoose');
const moment = require('moment');
const { FORMATS } = require('../constants/formats');

const Schema = mongoose.Schema;

class BaseModel {
  constructor(name, definition) {

    this.name       = name;
    this.definition = definition;
    this.Schema     = Schema;

    this.modelSchema = new Schema(definition);
    this.modelSchema.set('toJSON', {
      virtuals: true,
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        if (Boolean(ret.startDate)) {
          ret.startDate  = moment(ret.startDate).format(FORMATS.date);
        };
        if (Boolean(ret.createDate)) {
          ret.createDate = moment(ret.createDate).format(FORMATS.dateTime);
        };
        if (Boolean(ret.period)) {
          ret.period = moment(ret.period).format(FORMATS.date);
        };
        delete ret._id;
        delete ret.__v;
      },
    });
  }

  createModel() {
    return mongoose.model(this.name, this.modelSchema);
  }
}

module.exports = {
  BaseModel,
  Schema,
};
