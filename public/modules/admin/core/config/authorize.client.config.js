angular.module('core').config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $location) {
		return {
			responseError: function(rejection) {
				var statusCode = rejection.status;

				if (statusCode === 401 || statusCode === 403) {
					return window.location = '/admin/login';
				}
				return $q.reject(rejection);
			}
		}
	});
}]);