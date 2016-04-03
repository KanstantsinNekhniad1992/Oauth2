var express = require('express'),
    router = express.Router();

router.use('/', function(req, res, next) {

    if(!req.user) {
        res.redirect('/');
    } else {
        next();
    }

});

router.get('/', function (req, res) {
    res.render('users', {
        user: {
            name: req.user.displayName
        }
    });
});

module.exports = router;