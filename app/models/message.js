var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Bookmark Schema
var messageSchema = mongoose.Schema({
	sender : {
		type : String,
		require : true
	},
	receiver : {
		type : String,
		require : true
	},
	message_body : {
		type : String
	},
	timestamp : {
		type : String
	}
});

var Message = module.exports = mongoose.model('Message', messageSchema);