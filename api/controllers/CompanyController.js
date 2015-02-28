/**
 * CompanyController
 *
 * @description :: Server-side logic for managing Companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

var passport = require('passport');

module.exports = {
  passportLocal: function (req, res) {
    passport.authenticate('local', function (err, company, info) {
      if (err || !company) {
        res.redirect('/login');
        return;
      }

      req.logIn(company, function (err) {
        if (err) {
          res.redirect('/login');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CompanyController)
   */
  _config: {}
};