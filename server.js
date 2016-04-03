var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    passport = require('passport'),
    auth = require('./routes/auth'),
    users = require('./routes/users'),
    index = require('./routes/routes'),
    db;

var app = express();
db = mongoose.connect('mongodb://localhost:27017/OauthDB');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static('views'));



app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')();

app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use('/errors', function(err, req, res) {
    res.status(err.status || 500);
    res.render('errors', {
        message: err.message,
        error: err
    });
});

if(app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('errors', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('errors', {
        message: err.message,
        error: {}
    });
});

app.listen('5250', function () {
    console.log('project runs on port 5250');
});
