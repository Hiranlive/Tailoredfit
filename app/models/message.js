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

module.exports.getMessages = function(user_id, callback) {
	var filterOptions = {$or:[{'sender' : user_id}, {'receiver' : user_id}]};

	Message.find(filterOptions).exec(callback);
}

module.exports.getMessagesOfReceiver = function(user_id, receiver_id, callback) {
	var filterOptions = {$or:[{'sender' : user_id, 'receiver' : receiver_id}, {'sender' : receiver_id, 'receiver' : user_id}]};

	Message.find(filterOptions).exec(callback);
}