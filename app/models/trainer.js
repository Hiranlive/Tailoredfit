var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Trainer Schema
var trainerSchema = mongoose.Schema({
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
	insured : {
		type : String
	},
	services : [],
	availability : {
		type : String,
		require : true
	},
	address : {
		type : String,
		require : true
	},
	zip_code : {
		type : String
	},
	certification : {
		type : String
	},
	facility_house_calls : {
		type : String
	},	
	price : {
		type : Number
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

var Trainer = module.exports = mongoose.model('Trainer', trainerSchema);

// Get Trainers
module.exports.getTrainers = function(callback, limit) {
	Trainer.find(callback).limit(limit);
}

// Get Single Trainer
module.exports.getTrainerById = function(id, callback) {
	Trainer.findById(id, callback)
}

// Add Trainer
module.exports.addTrainer = function(trainer, callback) {
	Trainer.create(trainer, callback);
}

// Update Trainer
module.exports.updateTrainer = function(id, trainer, options, callback) {
	var query = {_id : id};
	
	var update = {};

	if(trainer.name != undefined) {
		update['name'] = trainer.name;
	}

	if(trainer.gender != undefined) {
		update['gender'] = trainer.gender;
	}

	if(trainer.phone != undefined) {
		update['phone'] = trainer.phone;
	}

	if(trainer.insured != undefined) {
		update['insured'] = trainer.insured;
	}

	if(trainer.services != undefined) {
		update['services'] = trainer.services;
	}

	if(trainer.availability != undefined) {
		update['availability'] = trainer.availability;
	}

	if(trainer.address != undefined) {
		update['address'] = trainer.address;
	}

	if(trainer.zip_code != undefined) {
		update['zip_code'] = trainer.zip_code;
	}

	if(trainer.certification != undefined) {
		update['certification'] = trainer.certification;
	}

	if(trainer.facility_house_calls != undefined) {
		update['facility_house_calls'] = trainer.facility_house_calls;
	}

	if(trainer.price != undefined) {
		update['price'] = trainer.price;
	}

	if(trainer.latitude != undefined) {
		update['latitude'] = trainer.latitude;
	}

	if(trainer.longitude != undefined) {
		update['longitude'] = trainer.longitude;
	}

	if(trainer.profile_image != undefined) {
		update['profile_image'] = trainer.profile_image;
	}
	
	Trainer.findOneAndUpdate(query, update, options, callback);
}

module.exports.updateTrainerRating = function(id, trainer, options, callback) {
	var query = {_id : id};
	
	var update = {
		total_rates : trainer.total_rates,
		no_of_rates : trainer.no_of_rates
	};

	Trainer.findOneAndUpdate(query, update, options, callback);
}

// Remove Trainer
module.exports.removeTrainer = function(id, callback) {
	var query = {_id : id};

	Trainer.remove(query, callback);
}

// Filter Trainers
module.exports.filterTrainers = function(filters, callback) {
	var filterOptions = {};

	if(filters['zip_code'] != undefined && filters['zip_code'] != '') {
		filterOptions['zip_code'] = filters['zip_code'];
	}

	if(filters['services'] != undefined && filters['services'] != '') {
		filterOptions['services'] = filters['services'];
	}

	if(filters['price_gt'] != undefined && filters['price_gt'] != '' && filters['price_lt'] != undefined && filters['price_lt'] != '') {
		filterOptions['price'] = { $gte: filters['price_gt'], $lte: filters['price_lt'] };
	}
	
	Trainer.find(filterOptions).exec(callback);
}