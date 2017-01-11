var application = angular.module('starter');

application.controller('UserCtrl', function($scope, $http, AuthService, API_ENDPOINT) {
    $scope.user = {
        name : '',
        password : ''
    };

    $scope.login = function() {
        AuthService.login($scope.user).then(function(msg) {
            console.log("Login Successful!!!");
            window.location.href='#!/gyms';
        }, function(errMsg) {
            alert(errMsg);
            console.log(errMsg);
        });
    };

    $scope.isLogged = function() {
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                window.location.href='#!/gyms';
            }
        }, function(errMsg) {
            // alert(errMsg.data);
            window.location.href='#!/';
        });
    };

    $scope.getUserDetails = function() {
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                $http.get(API_ENDPOINT.url + '/users').then(function(response) {
                    $scope.users = response['data'];
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

    $scope.removeUser = function(id){
        $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
            if(result.data.success){
                var r = confirm("Are you sure want to remove?");

                if (r == true) {
                    $http.delete('/api/users/'+id).then(function(response){
                        alert("User is successfully removed!");
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

// application.controller('RegisterCtrl', function($scope, AuthService) {
//     $scope.user = {
//         name : '',
//         password : ''
//     };

//     $scope.signup = function() {
//         AuthService.register($scope.user).then(function(msg) {
//             // window.location.href = '#!/inside';
//             console.log("Registration Successful!!!");
//         }, function(errMsg) {
//             alert(errMsg);
//             console.log(errMsg);
//         });
//     };
// });

// application.controller('InsideCtrl', function($scope, $http, $location, $routeParams, AuthService, API_ENDPOINT) {
//     $scope.destroySession = function() {
//         AuthService.logout();
//     };

    // $scope.getInfo = function() {
    //     $http.get(API_ENDPOINT.url + '/is_logged').then(function(result) {
    //         $scope.memberinfo = result.data.msg;
    //     }, function(errMsg) {
    //         alert(errMsg.data);
    //         window.location.href='#!/outside';
    //     });
    // };

//     $scope.logout = function() {
//         AuthService.logout();
//         window.location.href='#!/outside';
//     };
// });