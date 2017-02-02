var application = angular.module('starter');

application.controller('TrainerCtrl', function($scope, $http, $location, $routeParams, AuthService, API_ENDPOINT) {
    $scope.getTrainerDetails = function() {
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
        	if(result.data.success){
        		$http.get(API_ENDPOINT.url + '/trainers').then(function(response) {
                    $scope.condition = true;
		        	$scope.trainers = response['data'];
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
            // alert(errMsg.data);
            console.log(errMsg.data);
            window.location.href='#!/';
        });
    };

    $scope.getTrainer = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var id = $routeParams.id;
                $http.get('/api/trainers/'+id).then(function(response){
                    $scope.trainer = response['data'];
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

    $scope.addTrainer = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                $http.post('/api/trainers', $scope.trainer).then(function(response){
                    alert("New trainer is added successfully!");
                    window.location.href='#!/trainers';
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

    $scope.updateTrainer = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var id = $routeParams.id;

                $http.put('/api/trainers/'+id, angular.toJson($scope.trainer)).then(function(response){
                    alert("Trainer is successfully updated!");
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

    $scope.removeTrainer = function(id){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var r = confirm("Are you sure want to remove?");

                if (r == true) {
                    $http.delete('/api/trainers/'+id).then(function(response){
                        alert("Trainer is successfully removed!");
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
            else{
                $scope.condition = true;
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