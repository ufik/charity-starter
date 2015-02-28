/**
* Project.js
*
* @description :: 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Money = require('js-money');
var Validators = require('../validators/Validators');

module.exports = {
  identity: 'project',

  schema: true,

  types: {
    money: Validators.money,
    address: Validators.address
  },

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    address: {
      type: 'json',
      address: true
    },
    targetAmount: {
      type: 'json',
      money: true
    },
    currentAmount: {
      type: 'json',
      money: true
    },
    status: {
      type: 'integer',
    },
    company: {
      model: 'company'
    }
  },

  createMoneyObjects: function (values) {
    var targetAmount = JSON.parse(values.targetAmount);

    values.targetAmount = new Money(targetAmount.amount, targetAmount.currency);
    values.currentAmount = new Money(0, targetAmount.currency);
  },

  beforeUpdate: function (values, cb) {
    this.createMoneyObjects(values);
    cb();
  },

  beforeCreate: function (values, cb) {
    this.createMoneyObjects(values);
    cb();
  }
};
