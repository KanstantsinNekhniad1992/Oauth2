var mongoose = require('mongoose');

var RefreshMongooseSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	clientId: {
		type: String,
		required: true
	},
	token: {
		type: String,
		unique: true,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('RefreshMongoose', RefreshMongooseSchema);