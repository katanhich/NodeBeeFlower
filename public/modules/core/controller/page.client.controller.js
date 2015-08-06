angular.module('core').controller('PagesController', function($scope, $routeParams, $location, $http) {

	$scope.findByLink = function() {
		$http.get('/pages/' + $routeParams.link).success(function(data) {
			$scope.page = data;
		});
	}; 
});