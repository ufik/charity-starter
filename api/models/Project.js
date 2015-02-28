/**
* Project.js
*
* @description :: 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Money = require('js-money');

module.exports = {
  types: {
    money: function (money) {
      
      return money.amount && money.currency;
    }
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
    street: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    postcode: {
      type: 'string',
    },
    country: {
      type: 'string',
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
    address: {
      type: 'string',
      required: true
    }
  },

  createMoneyObjects: function(values) {
    values.targetAmount = new Money(values.targetAmount.amount, values.targetAmount.currency);
    values.currentAmount = new Money(values.currentAmount.amount, values.currentAmount.currency);
  },

  beforeUpdate: function () {
    this.createMoneyObjects(values);
    cb();
  },

  beforeCreate: function (values, cb) {
    this.createMoneyObjects(values);
    cb();
  }
};
