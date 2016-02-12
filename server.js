var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));

app.get('/', function(req, res) {
	res.send('Hello world!');
});

app.get('/index', function(req, res) {
	res.render('index');
});

app.listen('5250', function() {
	console.log('project runs on port 5250');
});
