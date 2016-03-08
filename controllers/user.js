var User = require('../models/user');

exports.postUsers = function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    user.save(function (err) {
        if (err) {
            res.send(err)
        }

        res.json({message: 'user added'});
    })
}

exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
        }

        res.json(users);
    })
}

exports.getUser = function (req, res) {
    User.findOne({id: req.params.id}, function (err, user) {

        if (err) {
            res.send(err);
        }

        res.json(user);

    });
}