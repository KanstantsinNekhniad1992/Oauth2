var passport = require('passport');

module.exports = function() {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    require('../strategies/google.strategies')();
    require('../strategies/facebook.strategy')();

}