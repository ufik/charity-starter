var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

/*passport.serializeCompany(function(company, done) {
    done(null, company.id);
});*/

/*passport.deserializeCompany(function(id, done) {
    Company.findOneById(id).done(function (err, company) {
        done(err, company);
    });
});*/

passport.use(new LocalStrategy({
        companynameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
    Company.findOne({ email: email}).done(function(err, company) {
          if (err) { return done(err); }
            if (!company) { return done(null, false, { message: 'Unknown company ' + email }); }
            if (company.password != password) { return done(null, false, { message: 'Invalid password' }); }
            return done(null, company);
        });
    }
));