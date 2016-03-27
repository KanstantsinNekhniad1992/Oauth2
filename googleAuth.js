var express = require('express'),
    passport = require('passport'),
    router = express.Router();

router.route('/google/callback').get(passport.authenticate('google', {
        successRedirect: '/googleUsers',
        failure: '/errors'
    }));

router.route('/google').get(passport.authenticate('google', {
        scope: [ 'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    }));

module.exports = router;