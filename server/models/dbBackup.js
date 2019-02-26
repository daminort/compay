const { BaseModel } = require('./BaseModel');

const modelDefinition = {
	services     : { type : Boolean, default: false },
	scales       : { type : Boolean, default: false },
	rates        : { type : Boolean, default: false },
  calculations : { type : Boolean, default: false },
  completed    : { type : Boolean, default : false },
  error        : { type : Boolean, default : false },
  errorMessage : { type : String, default : '' },
  percent      : { type : Number, default : 0 },
  date         : { type : Date, default : null },
  fileName     : { type : String, default : '' },
};
const DBBackup = new BaseModel('DBBackup', modelDefinition).createModel();

module.exports = DBBackup;
