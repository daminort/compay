const { BaseModel } = require('./BaseModel');

const modelDefinition = {
	name            : { type : String, required : true, max   : 50 },
	personalAccount : { type : String, max      : 50, default : '' },
	icon            : { type : String, default  : '' },
	info            : { type : String, default  : '' },
	deleted         : { type : Boolean, default : false },
	
	account : {
		number : { type : String, max : 50, default : '' },
		bank   : { type : String, max : 50, default : '' },
		mfo    : { type : String, max : 20, default : '' },
		okpo   : { type : String, max : 20, default : '' },
	},
	contacts : {
		address : { type : String, default : '' },
		phone   : { type : String, default : '' },
	},
	online : {
		website  : { type : String, default : '' },
		login    : { type : String, default : '' },
		password : { type : String, default : '' },
		email    : { type : String, default : '' },
	},
};
const Service = new BaseModel('Service', modelDefinition).createModel();

module.exports = Service;
