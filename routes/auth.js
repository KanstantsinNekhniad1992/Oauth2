var express = require('express'),
    passport = require('passport'),
    router = express.Router();

router.route('/google/callback').get(passport.authenticate('google', {
        successRedirect: '/users',
        failure: '/errors'
    }));

router.route('/google').get(passport.authenticate('google', {
        scope: [ 'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    }));

router.route('/facebook').get(passport.authenticate('facebook', {
    scope: ['email']
}));

router.route('/facebook/callback').get(passport.authenticate('facebook', {
   successRedirect: '/users',
    failureRedirect: '/errors'
}));

module.exports = router;