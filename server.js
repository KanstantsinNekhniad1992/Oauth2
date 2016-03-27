var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    passport = require('passport'),
    auth = require('./googleAuth'),
    router = express.Router();

var app = express();

app.set('view engine', 'ejs');

var googleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new googleStrategy({
        clientID: '499286742753-aln8lr6eiba3iq3le1unc4au7mm37m20.apps.googleusercontent.com',
        clientSecret: 'yREGrdZNvKSr4PcGXMsZ8Rf7',
        callbackUrl: 'http://localhost:5250/auth/google/callback'
    },
    function (req, accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

//mongoose.connect('mongodb://localhost:27017/UserDb');

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static('views'));

app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', function (req, res) {
    res.render('index', {title: 'Google Oauth2.0'});
});

app.use('/auth', function(req, res) {
    console.log('HERE!!!!!!!!');
    res.send({
        user: 'Kostya'
    });
});
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

//require('./route')(app);

app.listen('5250', function () {
    console.log('project runs on port 5250');
});