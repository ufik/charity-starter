/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	hi: function (req, res) {
    	return res.send("Hi there!");
 	},
 	find: function (req, res) {
 		  var where = req.param('where');

	      if (_.isString(where)) {
	              where = JSON.parse(where);
	      }

 		  var options = {
                  limit: req.param('limit') || undefined,
                  skip: req.param('skip')  || undefined,
                  sort: req.param('sort') || undefined,
                  where: where || undefined
          };

 		  Company.find(options, function(err, company) {

	          if(company === undefined) return res.notFound();

	          if (err) return next(err);

	          res.json(company);

	      });
    	return res.send("Projects List!");
 	},
 };

