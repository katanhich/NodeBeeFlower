'use strict';

// Advertises controller
angular.module('advertises').controller('AdvertisesController', ['$scope', '$routeParams', '$location',
	'Authentication', 'Advertises', 'Upload',
	function($scope, $routeParams, $location, Authentication, Advertises, Upload) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			Upload.upload({
				url: '/admin/advertises',
				fields: $scope.advertise,
				file: $scope.image[0]
			}).success(function (data, status, headers, config) {
				$location.path('advertises');
			}).error(function(errorResponse) {
				$scope.error = errorResponse.message;
			});
		};

		// Remove existing Advertise
		$scope.remove = function(advertise) {
			if ( advertise ) { 
				advertise.$remove();

				for (var i in $scope.advertises) {
					if ($scope.advertises [i] === advertise) {
						$scope.advertises.splice(i, 1);
					}
				}
			} else {
				$scope.advertise.$remove(function() {
					$location.path('advertises');
				});
			}
		};

		// Update existing Advertise
		$scope.update = function() {
			var file = null;
			if ($scope.image && $scope.image.length) {
				file = $scope.image[0];
			}

			Upload.upload({
				method: 'PUT',
				url: '/admin/advertises/' + $scope.advertise._id,
				fields: $scope.advertise,
				file: file
			}).success(function (data, status, headers, config) {
				$location.path('advertises');
			}).error(function(errorResponse) {
				$scope.error = errorResponse.message;
			});
		};

		// Find a list of Advertises
		$scope.find = function() {
			$scope.advertises = Advertises.query();
		};

		// Find existing Advertise
		$scope.findOne = function() {
			$scope.advertise = Advertises.get({ 
				advertiseId: $routeParams.advertiseId
			});
		};
	}
]);