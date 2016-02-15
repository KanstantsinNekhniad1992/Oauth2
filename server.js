var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
    mongoose = require('mongoose'),
    UserController = require('./controllers/user');
    router = express.Router();

var app = express();

mongoose.connect('mongodb://localhost:27017/UserDb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));

var userRoute = router.route('/users');

//userRoute.post(UserController.postUsers);
//userRoute.get(UserController.getUsers);

app.get('/users', UserController.getUsers);
app.post('/users', UserController.postUsers);

//app.get('/', function(req, res) {
//	res.send('Hello world!');
//});
//
//app.get('/index', function(req, res) {
//	res.render('index');
//});

app.listen('5250', function() {
	console.log('project qwe runs on port 5250');
});