var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Nutritionist Schema
var nutritionistSchema = mongoose.Schema({
	name : {
		type : String,
		require : true
	},
	gender : {
		type : String,
		require : true
	},
	phone : {
		type : String
	},
	address : {
		type : String,
		require : true
	},
	availability : {
		type : String,
		require : true
	},
	no_of_rates : {
		type : Number,
		default : 0,
	},
	total_rates : {
		type :  Number,
		default : 0,
	},
	latitude : {
		type : String,
		require : true
	},
	longitude : {
		type : String,
		require : true
	},
	profile_image : {
		type : String
	}
});

var Nutritionist = module.exports = mongoose.model('Nutritionist', nutritionistSchema);

// Get Nutritionists
module.exports.getNutritionists = function(callback, limit) {
	Nutritionist.find(callback).limit(limit);
}

// Get Single Nutritionist
module.exports.getNutritionistById = function(id, callback) {
	Nutritionist.findById(id, callback)
}

// Add Nutritionist
module.exports.addNutritionist = function(nutritionist, callback) {
	Nutritionist.create(nutritionist, callback);
}

// Update Nutritionist
module.exports.updateNutritionist = function(id, nutritionist, options, callback) {
	var query = {_id : id};
	
	var update = {
		name : nutritionist.name,
		gender : nutritionist.gender,
		phone : nutritionist.phone,
		address : nutritionist.address,
		availability : nutritionist.availability,
		latitude : nutritionist.latitude,
		longitude : nutritionist.longitude,
		profile_image : nutritionist.profile_image
	};

	Nutritionist.findOneAndUpdate(query, update, options, callback);
}

// Remove Nutritionist
module.exports.removeNutritionist = function(id, callback) {
	var query = {_id : id};

	Nutritionist.remove(query, callback);
}