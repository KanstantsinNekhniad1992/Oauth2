var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
    mongoose = require('mongoose'),
	passport = require('passport');

var app = express();

mongoose.connect('mongodb://localhost:27017/UserDb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));

app.use(passport.initialize());

require('./route')(app);

app.listen('5250', function() {
	console.log('project runs on port 5250');
});