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
	services : {
		type : String
	},
	availability : {
		type : String,
		require : true
	},
	address : {
		type : String,
		require : true
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
	
	var update = {
		name : trainer.name,
		gender : trainer.gender,
		phone : trainer.phone,
		insured : trainer.insured,
		services : trainer.services,
		availability : trainer.availability,
		address : trainer.address,
		certification : trainer.certification,
		facility_house_calls : trainer.facility_house_calls,
		price : trainer.price,
		latitude : trainer.latitude,
		longitude : trainer.longitude,
		profile_image : trainer.profile_image
	};

	Trainer.findOneAndUpdate(query, update, options, callback);
}

// Remove Trainer
module.exports.removeTrainer = function(id, callback) {
	var query = {_id : id};

	Trainer.remove(query, callback);
}