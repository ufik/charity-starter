/**
 * Company.js
 *
 * @description :: Company model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

'use strict';

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Validators = require('../validators/Validators');

module.exports = {
  identity: 'company',

  schema: true,

  types: {
    address: Validators.address
  },

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    address: {
      type: 'json',
      address: true
    },
    phone: {
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
    },
    projects: {
      collection: 'project',
      via: 'company'
    }
  },

  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password, SALT_WORK_FACTOR, function (err, hash) {
      if (err) {
        throw err;
      }

      values.password = hash;
      cb();
    });
  }
};