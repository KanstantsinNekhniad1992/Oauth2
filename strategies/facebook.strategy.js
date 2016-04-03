var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/user');

module.exports = function () {
    passport.use(new FacebookStrategy({
            clientID: '1145756292155454',
            clientSecret: 'c4700acb7152e3febed0be07d35b48c6',
            callbackURL: 'http://localhost:5250/auth/facebook/callback',
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {

            User.findOne({'facebook.id': profile.id}, function (err, user) {

                if (user) {
                    done(null, user);
                } else {
                    user = new User();

                    user.displayName = profile.displayName;

                    user.facebook = {};

                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;

                    user.save();
                    done(null, user);
                }
            });

        }));
}
