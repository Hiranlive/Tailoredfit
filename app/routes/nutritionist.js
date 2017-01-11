var express  = require('express');
var router = express.Router();

Nutritionist = require('../models/nutritionist');

router.get('/api/nutritionists', function function_name(req, res) {
	Nutritionist.getNutritionists(function(err, nutritionists) {
		if(err){
			throw err;
		}
		else{
			res.json(nutritionists);
		}
	}, 1000)
});

router.post('/api/nutritionists', function function_name(req, res) {
	var nutritionist = req.body;

	Nutritionist.addNutritionist(nutritionist, function(err, nutritionist) {
		if(err){
			throw err;
		}
		else{
			res.json(nutritionist);
		}
	}, 1000)
});

router.get('/api/nutritionists/:_id', function (req, res) {
	Nutritionist.getNutritionistById(req.params._id, function(err, nutritionist) {
		if(err){
			throw err;
		}
		else{
			res.json(nutritionist);
		}
	})
});

router.put('/api/nutritionists/:_id', function function_name(req, res) {
	var id = req.params._id;
	var nutritionist = req.body;

	Nutritionist.updateNutritionist(id, nutritionist, {}, function(err, nutritionist) {
		if(err){
			throw err;
		}
		else{
			res.json(nutritionist);
		}
	})
});

router.delete('/api/nutritionists/:_id', function (req, res) {
	var id = req.params._id;
	var nutritionist = req.body;

	Nutritionist.removeNutritionist(id, function(err, nutritionist) {
		if(err){
			throw err;
		}
		else{
			res.json(nutritionist);
		}
	})
});

module.exports = router;