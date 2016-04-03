var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Google Oauth2.0'
    })
});

module.exports = router;