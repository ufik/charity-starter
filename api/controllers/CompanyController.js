/**
 * CompanyController
 *
 * @description :: Server-side logic for managing Companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');
var bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10
  , MIN_PASSWORD_LENGTH = 8;

module.exports = {

	create: function(req,res) {
		try {
			if(!req.param('password') || req.param('password').length < MIN_PASSWORD_LENGTH) {
				throw new Error("password not sent or doesn't meet length requirement ("+MIN_PASSWORD_LENGTH+" chars)");
			}
			if(!req.param('name')) {
				throw new Error("name is required)");
			}
			if(!req.param('address')) {
				throw new Error("address is required)");
			}
			if(!req.param('email')) {
				throw new Error("email is required)");
			}
			if(!req.param('phone')) {
				throw new Error("phone is required)");
			}
			
			function createCompany(hash) {
				Company.create({
          			name:    req.param('name'),
					email:     req.param('email'),
					address: req.param('address'),
					phone: req.param('phone'),
					password:  hash
				}).exec(function createCB(err,company){
					if(err) throw err;
					return res.json(company);
				});

			};

			bcrypt.hash(req.param('password'),SALT_WORK_FACTOR,function(err, hash){
				if(err) throw err;
				createCompany(hash);
			});

		} catch(e) {
			return res.json({ error : e.message },500);
		}
	},

	passport_local: function(req, res)
    {
        passport.authenticate('local', function(err, company, info)
        {
            if ((err) || (!company))
            {
                res.redirect('/login');
                return;
            }

            req.logIn(company, function(err)
            {
                if (err)
                {
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

