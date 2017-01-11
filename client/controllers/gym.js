var application = angular.module('starter');

application.controller('GymCtrl', function($scope, $http, $location, $routeParams, AuthService, API_ENDPOINT) {
    $scope.getGymDetails = function() {
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
        	if(result.data.success){
        		$http.get(API_ENDPOINT.url + '/gyms').then(function(response) {
		        	$scope.gyms = response['data'];
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

    $scope.getGym = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var id = $routeParams.id;
                $http.get('/api/gyms/'+id).then(function(response){
                    $scope.gym = response['data'];
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

    $scope.addGym = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                $http.post('/api/gyms/', $scope.gym).then(function(response){
                    alert("New gym is added successfully!");
                    window.location.href='#!/gyms';
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

    $scope.updateGym = function(){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var id = $routeParams.id;

                $http.put('/api/gyms/'+id, $scope.gym).then(function(response){
                    alert("Gym is successfully updated!");
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

    $scope.removeGym = function(id){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var r = confirm("Are you sure want to remove?");

                if (r == true) {
                    $http.delete('/api/gyms/'+id).then(function(response){
                        alert("Gym is successfully removed!");
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