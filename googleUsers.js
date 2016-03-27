var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    req.render('users', {
        user: {
            name: req.user.displayName,
            image: req.user._json.image.url
        }
    });
});

module.exports = router;