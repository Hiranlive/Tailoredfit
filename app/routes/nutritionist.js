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

router.post('/api/filter_nutritionists', function function_name(req, res) {
	var filters = req.body;

	Nutritionist.filterNutritionists(filters, function(err, nutritionists) {
		if(err){
			res.json({
                success: false,
                msg: 'Error in filtering.'
            });
		}
		else{
			res.json(nutritionists);
		}
	})
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

router.put('/api/rate_nutritionists/:_id', function function_name(req, res) {
	var id = req.params._id;

	Nutritionist.getNutritionistById(id, function(err, nutritionist) {
		if(err){
			res.json({
                success: false,
                msg: 'Nutritionist not found'
            });
		}
		else{
			var newNutritionist = {};

			newNutritionist['total_rates'] = parseInt(nutritionist['total_rates']) + parseInt(req.body.rating);
			newNutritionist['no_of_rates'] = parseInt(nutritionist['no_of_rates']) + 1;

            Nutritionist.updateNutritionistRating(id, newNutritionist, {}, function(err, nutritionist) {
				if(err){
					res.json({
		                success: false,
		                msg: 'Invalid Request'
		            });
				}
				else{
					res.json({
		                success: true,
		                msg: 'Rating Successful'
		            });
				}
			})
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