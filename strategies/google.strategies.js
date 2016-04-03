var passport = require('passport'),
    googleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('../models/user');

module.exports = function() {

    passport.use(new googleStrategy({
            clientID: '499286742753-aln8lr6eiba3iq3le1unc4au7mm37m20.apps.googleusercontent.com',
            clientSecret: 'yREGrdZNvKSr4PcGXMsZ8Rf7',
            callbackURL: 'http://localhost:5250/auth/google/callback'
        },
        function (req, accessToken, refreshToken, profile, done) {

            User.findOne({'google.id': profile.id}, function(err, user) {

                if(user) {
                    done(null, user);
                } else {

                    var user = new User();

                    user.email = profile.emails[0].value;
                    user.image = profile._json.image.url;
                    user.displayName = profile.displayName;

                    user.google = {};

                    user.google.id = profile.id;
                    user.google.token = accessToken;

                    user.save();
                    done(null, user);

                }
            });
        }
    ));

}