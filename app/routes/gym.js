var express  = require('express');
var router = express.Router();

Gym = require('../models/gym');

router.get('/api/gyms', function function_name(req, res) {
	Gym.getGyms(function(err, gyms) {
		if(err){
			throw err;
		}
		else{
			res.json(gyms);
		}
	}, 1000)
});

router.post('/api/gyms', function function_name(req, res) {
	var gym = req.body;

	Gym.addGym(gym, function(err, gym) {
		if(err){
			throw err;
		}
		else{
			res.json(gym);
		}
	}, 1000)
});

router.get('/api/gyms/:_id', function (req, res) {
	Gym.getGymById(req.params._id, function(err, gym) {
		if(err){
			throw err;
		}
		else{
			res.json(gym);
		}
	})
});

router.get('/api/gym_type/:_type', function (req, res) {
	Gym.getGymByType(req.params._type, function(err, gym) {
		if(err){
			throw err;
		}
		else{
			res.json(gym);
		}
	})
});

router.put('/api/gyms/:_id', function function_name(req, res) {
	var id = req.params._id;
	var gym = req.body;

	Gym.updateGym(id, gym, {}, function(err, gym) {
		if(err){
			throw err;
		}
		else{
			res.json(gym);
		}
	})
});

router.delete('/api/gyms/:_id', function (req, res) {
	var id = req.params._id;
	var gym = req.body;

	Gym.removeGym(id, function(err, gym) {
		if(err){
			throw err;
		}
		else{
			res.json(gym);
		}
	})
});

module.exports = router;