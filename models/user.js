var mongoose = require('mongoose'),
	crypto = require('crypto');

var UserSchema = new mongoose.Schema({

	displayName: {
		type: String
	},
	email: {
		type: String
	},
	image: {
		type: String
	},
	google: {
		type: Object
	},
	facebook: {
		type: Object
	}
});
//
// UserSchema.methods.encryptPassword = function(password) {
// 	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
// };
//
// UserSchema.virtual('UserId')
// 		.get(function() {
// 			return this.id;
// 		});
//
// UserSchema.virtual('Password')
// 		.set(function(password) {
// 			this._plainPassword = password;
// 			this.salt = crypto.randomBytes(32).toString('base64');
//
// 			return this.hashedPassword = this.encryptPassword(this._plainPassword);
// 		})
// 		.get(function() {
// 			return this._plainPassword;
// 		});
//
// UserSchema.methods.checkPassword = function(password) {
// 	return this.hashedPassword == this.encryptPassword(password);
// };

module.exports = mongoose.model('User', UserSchema);

//UserSchema.pre('save', function (callback) {
//	var user = this;
//
//	if (!user.isModified('password')) return callback();
//
//	bcrypt.genSalt(5, function (err, salt) {
//
//		if (err) return callback(err);
//
//		bcrypt.hash(user.password, salt, null, function (err, hash) {
//
//			if (err) return callback(err);
//
//			user.password = hash;
//			callback();
//		});
//	});
//});
//
//UserSchema.methods.verifyPassword = function (password, callback) {
//	bcrypt.compare(password, this.password, function (err, isMatch) {
//		if (err) {
//			res.send(err);
//		}
//		callback(null, isMatch);
//	})
//};
//
