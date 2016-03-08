var UserController = require('./controllers/user'),
	auth = require('./controllers/auth');

module.exports = function(app) {

	app.get('/users', auth.isAuthenticated, UserController.getUsers);
	app.get('/users/:id', UserController.getUser);
	app.post('/users', UserController.postUsers);

};

