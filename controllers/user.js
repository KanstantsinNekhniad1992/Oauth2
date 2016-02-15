var User = require('../models/user');

exports.postUsers = function(req, res) {
    var user = new User({
       username: 'Kostya',
       password: '12345'
    });

    user.save(function(err){
        if(err) {
            res.send(err)
        }

        res.json({message: 'user added'});
    })
}

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if(err) {
            res.send(err);
        }

        res.json(users);
    })
}