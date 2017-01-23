var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Bookmark Schema
var bookmarkSchema = mongoose.Schema({
	user_id : {
		type : String,
		require : true
	},
	item_id : {
		type : String,
		require : true
	},
	type : {
		type : String,
		require : true
	},
	preview : {
		type : String
	}
});

var Bookmark = module.exports = mongoose.model('Bookmark', bookmarkSchema);