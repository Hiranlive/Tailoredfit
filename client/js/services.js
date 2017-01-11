var application = angular.module('starter');
var LOCAL_TOKEN_KEY = 'TailoredFitToken';

application.service('AuthService', function($q, $http, API_ENDPOINT) {
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    function getToken() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        
        return token;
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        isAuthenticated = true;
        authToken = token;

        // Set the token as header for your requests!
        $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;

        window.localStorage.removeItem(LOCAL_TOKEN_KEY);

        window.location.href='#!/';
    }

    var register = function(user) {
        return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/signup', user).then(function successCallback(response) {
		    	storeUserCredentials(response.data.token);
		    	resolve(response.data.msg);
		  	}, function errorCallback(response) {
		    	reject(response.data.msg);
			});
        });
    };

    var login = function(user) {
        return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/authenticate_admin', user).then(function successCallback(response) {
                console.log(response);
		    	storeUserCredentials(response.data.token);
		    	resolve(response.data.msg);
		  	}, function errorCallback(response) {
		    	reject(response.data.msg);
                console.log(response);
			});
        });
    };

    var logout = function() {
        destroyUserCredentials();
    };

    loadUserCredentials();

    return {
        login: login,
        register: register,
        logout: logout,
        isAuthenticated: function() {
            return isAuthenticated;
        },
    };
});

application.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function(response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
            }[response.status], response);
            return $q.reject(response);
        }
    };
});

application.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $httpProvider.defaults.headers.common.Authorization = window.localStorage[LOCAL_TOKEN_KEY];
}]);