'use strict';

// News controller
angular.module('news').controller('NewsController', function($scope, $routeParams, $location, Authentication, News, Upload) {
		$scope.authentication = Authentication;
		$scope.pageSize = 10;
		$scope.currentPage = 1;
		$scope.offset = 0;

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		$scope.init = function() {
			CKEDITOR.replace('detail', {
				filebrowserImageUploadUrl: "upload"
			});
		}

		// Create News
		$scope.create = function() {
			$scope.news.detail = CKEDITOR.instances.detail.getData();
			Upload.upload({
				url: '/admin/news',
				fields: $scope.news,
				file: $scope.image[0]
			}).success(function (data, status, headers, config) {
				$location.path('news');
			}).error(function(errorResponse) {
				$scope.error = errorResponse.message;
			});
		};

		// Remove existing News
		$scope.remove = function(news) {
			if ( news ) { 
				news.$remove();

				for (var i in $scope.lnews) {
					if ($scope.lnews [i] === news) {
						$scope.lnews.splice(i, 1);
					}
				}
			} else {
				$scope.news.$remove(function() {
					$location.path('news');
				});
			}
		};

		// Update existing News
		$scope.update = function() {
			var file = null;
			if ($scope.image && $scope.image.length) {
				file = $scope.image[0];
			}
			$scope.news.detail = CKEDITOR.instances.detail.getData();
			Upload.upload({
				method: 'PUT',
				url: '/admin/news/' + $scope.news._id,
				fields: $scope.news,
				file: file
			}).success(function (data, status, headers, config) {
				$location.path('news');
			}).error(function(errorResponse) {
				$scope.error = errorResponse.message;
			});
		};

		// Find a list of News
		$scope.find = function() {
			$scope.lnews = News.query();
		};

		// Find existing News
		$scope.findOne = function() {
			$scope.news = News.get({ 
				newsId: $routeParams.newsId
			});
			$scope.init();
		};
	}
);