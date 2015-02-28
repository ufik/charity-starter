/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;
var MIN_PASSWORD_LENGTH = 8;

module.exports = {
  	attributes: {
		name: {
			type: 'string',
			required: true	
		},
  		address: {
  			type: 'text',
  			required: true
  		},
  		phone:{
		   type: 'string',
		   defaultsTo: '000-000-0000'
		},
		password: {
  			type: 'string',
  			required: true,
  			minLength: 8
  		},
  		email: {
		   type: 'email',
		   unique: true,
		   required: true
		}
	},

	beforeCreate: function(values, cb) {
		bcrypt.hash(values.password, SALT_WORK_FACTOR, function(err, hash){
            if(err) {
            	throw err;
            }

            values.password = hash;
            cb();
        });
	  }
};