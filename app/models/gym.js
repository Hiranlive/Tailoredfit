var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Gym Schema
var gymSchema = mongoose.Schema({
	name : {
		type : String,
		require : true
	},
	type : {
		type : String,
		require : true
	},
	address : {
		type : String,
		require : true
	},
	latitude : {
		type : String,
		require : true
	},
	longitude : {
		type : String,
		require : true
	},
	phone : {
		type : String
	},
	price : {
		type : String
	},
	zip_code : {
		type : String
	},
	week_day_hours : {
		type : String
	},
	saturday_hours : {
		type : String
	},
	website : {
		type : String
	},
	profile_image : {
		type : String
	}
});

var Gym = module.exports = mongoose.model('Gym', gymSchema);

// Get Gyms
module.exports.getGyms = function(callback, limit) {
	Gym.find(callback).limit(limit);
}

module.exports.filterGyms = function(filters, filtercallback) {
	Gym.find(callback).limit(limit);

	var filterOptions = {};

	if(filters['zipcode'] != undefined) {
		filterOptions['zipcode'] = filters['zipcode'];
	}

	if(filters['price_gt'] != undefined && filters['price_lt'] != undefined) {
		filterOptions['price'] = { $gt: filters['price_gt'], $lt: filters['price_lt'] };
	}

	if(filters['services'] != undefined) {
		filterOptions['services'] = filters['services'];
	}

	Gym.find(filterOptions).exec(callback);
}

// Get Single Gym
module.exports.getGymById = function(id, callback) {
	Gym.findById(id, callback)
}

// Get Gym By Type
module.exports.getGymByType = function(type, callback) {
	Gym.find({'type':type}, callback);
}

// Add Gym
module.exports.addGym = function(gym_item, callback) {
	Gym.create(gym_item, callback);
}

// Update Gym
module.exports.updateGym = function(id, gym_item, options, callback) {
	var query = {_id : id};
	
	var update = {
		name : gym_item.name,
		type : gym_item.type,
		address : gym_item.address,
		latitude : gym_item.latitude,
		longitude : gym_item.longitude,
		phone : gym_item.phone,
		price : gym_item.price,
		zip_code : gym_item.zip_code,
		week_day_hours : gym_item.week_day_hours,
		saturday_hours : gym_item.saturday_hours,
		website : gym_item.website,
		profile_image : gym_item.profile_image,
	};

	Gym.findOneAndUpdate(query, update, options, callback);
}

// Remove Gym
module.exports.removeGym = function(id, callback) {
	var query = {_id : id};

	Gym.remove(query, callback);
}