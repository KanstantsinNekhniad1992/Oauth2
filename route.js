var UserController = require('./controllers/user');

module.exports = function (app) {

    app.get('/users', UserController.getUsers);
    app.get('/users/:id', UserController.getUser);
    app.post('/users', UserController.postUsers);

};

