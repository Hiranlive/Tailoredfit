var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Bookmark Schema
var bookmarkSchema = mongoose.Schema({
	user_id : {
		type : String,
		require : true
	},
	type : {
		type : String,
		require : true
	},
	preview : {
		type : String,
		require : true
	}
});

var Bookmark = module.exports = mongoose.model('Bookmark', bookmarkSchema);

// Get Bookmarks
module.exports.getBookmarks = function(callback, limit) {
	Bookmark.find(callback).limit(limit);
}

// Add Bookmark
module.exports.addBookmark = function(Bookmark, callback) {
	Bookmark.create(Bookmark, callback);
}

// Remove Bookmark
module.exports.removeBookmark = function(id, callback) {
	var query = {_id : id};

	Bookmark.remove(query, callback);
}