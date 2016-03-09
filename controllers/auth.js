var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	User = require('../models/user'),
	passportOauth2ClientPassword = require('passport-oauth2-client-password').Strategy,
	passportHttpBearer = require('passport-http-bearer').Strategy,
	AccessToken = require('../models/access-token'),
	RefreshToken = require('../models/refresh-token'),
	Client = require('../models/client');

passport.use(new BasicStrategy(
	function (username, password, done) {
		Client.findOne({clientId: username}, function (err, client) {
			if (err) {
				return done(err);
			}
			if (!client) {
				return done(null, false);
			}
			if (client.clientSecret != password) {
				return done(null, false);
			}

			return done(null, client);
		});
	}
));

passport.use(new passportOauth2ClientPassword(
	function (clientId, clientSecret, done) {
		Client.findOne({clientId: clientId}, function (err, client) {
			if (err) {
				return done(err);
			}
			if (!client) {
				return done(null, false);
			}
			if (client.clientSecret != clientSecret) {
				return done(null, false);
			}

			return done(null, client);
		});
	}
));

passport.use(new passportHttpBearer(
	function (accessToken, done) {
		AccessToken.findOne({token: accessToken}, function (err, token) {
			if (err) {
				return done(err);
			}
			if (!token) {
				return done(null, false);
			}

			if (Math.round((Date.now() - token.created) / 1000) > config.get('security:tokenLife')) {
				AccessToken.remove({token: accessToken}, function (err) {
					if (err) return done(err);
				});
				return done(null, false, {message: 'Token expired'});
			}

			User.findById(token.userId, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {message: 'Unknown user'});
				}

				var info = {scope: '*'};
				done(null, user, info);
			});
		});
	}
));

//
//passport.use(new BasicStrategy(
//
//	function (username, password, callback) {
//		User.findOne({username: username}, function (err, user) {
//			if (err) {
//				return callback(err);
//			}
//
//			if (!user) return callback(null, false);
//
//			user.verifyPassword(password, function (err, isMatch) {
//
//				if (err) {
//					return callback(err);
//				}
//
//				if (!isMatch) {
//					return callback(null, false);
//				}
//
//				return callback(null, user);
//
//			});
//		});
//	}
//));
//
//exports.isAuthenticated = passport.authenticate('basic', {session: 'false'});