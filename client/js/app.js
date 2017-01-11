var starter = angular.module('starter',['ngRoute']);

starter.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'UserCtrl',
		templateUrl: 'views/login.html'
	})
	.when('/gyms', {
		controller:'GymCtrl',
		templateUrl: 'views/gyms.html'
	})
	.when('/add_gym', {
		controller:'GymCtrl',
		templateUrl: 'views/add_gym.html'
	})
	.when('/edit_gym/:id', {
		controller:'GymCtrl',
		templateUrl: 'views/edit_gym.html'
	})
	.when('/trainers', {
		controller:'TrainerCtrl',
		templateUrl: 'views/trainers.html'
	})
	.when('/add_trainer', {
		controller:'TrainerCtrl',
		templateUrl: 'views/add_trainer.html'
	})
	.when('/edit_trainer/:id', {
		controller:'TrainerCtrl',
		templateUrl: 'views/edit_trainer.html'
	})
	.when('/nutritionists', {
		controller:'NutritionistCtrl',
		templateUrl: 'views/nutritionists.html'
	})
	.when('/add_nutritionist', {
		controller:'NutritionistCtrl',
		templateUrl: 'views/add_nutritionist.html'
	})
	.when('/edit_nutritionist/:id', {
		controller:'NutritionistCtrl',
		templateUrl: 'views/edit_nutritionist.html'
	})
	.when('/users', {
		controller:'UserCtrl',
		templateUrl: 'views/users.html'
	})
	// .when('/register',{
	// 	controller:'RegisterCtrl',
	// 	templateUrl: 'views/register.html'
	// })
	.otherwise({
		templateUrl: 'views/pages-404.html'
	});
});