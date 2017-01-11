var application = angular.module('starter');

application.controller('NutritionistCtrl', function($scope, $http, $location, $routeParams, AuthService, API_ENDPOINT) {
    $scope.getNutritionistDetails = function() {
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
        	if(result.data.success){
        		$http.get(API_ENDPOINT.url + '/nutritionists').then(function(response) {
		        	$scope.nutritionists = response['data'];
		        }, function(errMsg) {
		            alert(errMsg.data);
		            window.location.href='#!/';
		        });
        	}
        	else{
        		console.log("Admin Authorization Required!");
            	window.location.href='#!/';
        	}
        }, function(errMsg) {
            console.log(errMsg.data);
            window.location.href='#!/';
        });
    };

    $scope.getNutritionist = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var id = $routeParams.id;
                $http.get('/api/nutritionists/'+id).then(function(response){
                    $scope.nutritionist = response['data'];
                });
            }
            else{
                console.log("Admin Authorization Required!");
                window.location.href='#!/';
            }
        }, function(errMsg) {
            console.log(errMsg.data);
            window.location.href='#!/';
        });
    }

    $scope.addNutritionist = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                $http.post('/api/nutritionists/', $scope.nutritionist).then(function(response){
                    alert("New nutritionist is added successfully!");
                    window.location.href='#!/nutritionists';
                });
            }
            else{
                console.log("Admin Authorization Required!");
                window.location.href='#!/';
            }
        }, function(errMsg) {
            console.log(errMsg.data);
            window.location.href='#!/';
        });
    }

    $scope.updateNutritionist = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var id = $routeParams.id;

                $http.put('/api/nutritionists/'+id, $scope.nutritionist).then(function(response){
                    alert("Nutritionist is successfully updated!");
                    location.reload();
                });
            }
            else{
                console.log("Admin Authorization Required!");
                window.location.href='#!/';
            }
        }, function(errMsg) {
            console.log(errMsg.data);
            window.location.href='#!/';
        });
    }

    $scope.removeNutritionist = function(id){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var r = confirm("Are you sure want to remove?");

                if (r == true) {
                    $http.delete('/api/nutritionists/'+id).then(function(response){
                        alert("Nutritionist is successfully removed!");
                        location.reload();
                    });
                }
            }
            else{
                console.log("Admin Authorization Required!");
                window.location.href='#!/login';
            }
        }, function(errMsg) {
            console.log(errMsg.data);
            window.location.href='#!/';
        });
    }

    $scope.isAdminLogged = function() {
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(!result.data.success){
                console.log("Admin Authorization Required!");
                window.location.href='#!/';
            }
        }, function(errMsg) {
            console.log(errMsg.data);
            window.location.href='#!/';
        });
    };
    
    $scope.logout = function() {
        AuthService.logout();
        window.location.href='#!/';
    };
});