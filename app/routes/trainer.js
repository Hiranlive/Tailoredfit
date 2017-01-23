var express  = require('express');
var router = express.Router();

Trainer = require('../models/trainer');

router.get('/api/trainers', function function_name(req, res) {
	Trainer.getTrainers(function(err, trainers) {
		if(err){
			throw err;
		}
		else{
			res.json(trainers);
		}
	}, 1000)
});

router.post('/api/trainers', function function_name(req, res) {
	var trainer = req.body;

	Trainer.addTrainer(trainer, function(err, trainer) {
		if(err){
			throw err;
		}
		else{
			res.json(trainer);
		}
	}, 1000)
});

router.get('/api/trainers/:_id', function (req, res) {
	Trainer.getTrainerById(req.params._id, function(err, trainer) {
		if(err){
			throw err;
		}
		else{
			res.json(trainer);
		}
	})
});

router.put('/api/trainers/:_id', function function_name(req, res) {
	var id = req.params._id;
	var trainer = req.body;

	Trainer.updateTrainer(id, trainer, {}, function(err, trainer) {
		if(err){
			throw err;
		}
		else{
			res.json(trainer);
		}
	})
});

router.put('/api/rate_trainers/:_id', function function_name(req, res) {
	var id = req.params._id;

	Trainer.getTrainerById(id, function(err, trainer) {
		if(err){
			throw err;
		}
		else{
			var newTrainer = {};

			newTrainer['total_rates'] = parseInt(trainer['total_rates']) + parseInt(req.body.rating);
			newTrainer['no_of_rates'] = parseInt(trainer['no_of_rates']) + 1;

            Trainer.updateTrainer(id, newTrainer, {}, function(err, trainer) {
				if(err){
					throw err;
				}
				else{
					res.json({
		                success: true,
		                msg: 'Rating successful.'
		            });
				}
			})
		}
	})
});

router.delete('/api/trainers/:_id', function (req, res) {
	var id = req.params._id;
	var trainer = req.body;

	Trainer.removeTrainer(id, function(err, trainer) {
		if(err){
			throw err;
		}
		else{
			res.json(trainer);
		}
	})
});

module.exports = router;