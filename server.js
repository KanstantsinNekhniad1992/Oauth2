var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
    mongoose = require('mongoose'),
    UserController = require('./controllers/user');
    router = express.Router(),
	passport = require('passport'),
	auth = require('./controllers/auth');

var app = express();

mongoose.connect('mongodb://localhost:27017/UserDb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));

app.use(passport.initialize());

app.get('/users', auth.isAuthenticated, UserController.getUsers);
app.post('/users', auth.isAuthenticated, UserController.postUsers);

app.listen('5250', function() {
	console.log('project runs on port 5250');
});