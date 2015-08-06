'use strict';

// News controller
angular.module('pages').controller('PagesController', 
	function($scope, $routeParams, $location, Authentication, Pages) {
		$scope.authentication = Authentication;
		$scope.pageSize = 10;
		$scope.currentPage = 1;
		$scope.offset = 0;
		$scope.page = {};

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		$scope.init = function() {
			var ck = CKEDITOR.replace('detail', {
				filebrowserImageUploadUrl: "upload"
			});
			ck.setData($scope.page.detail);
		}

		$scope.create = function() {
			$scope.page.detail = CKEDITOR.instances.detail.getData();
			var page = new Pages($scope.page);

			page.$save(function(data) {
				$location.path('pages');
			}, function(errorResponse) {
				$scope.error = errorResponse.message;
			});
		};

		// Remove existing News
		$scope.remove = function(page) {
			if ( page ) { 
				page.$remove();

				for (var i in $scope.pages) {
					if ($scope.pages [i] === page) {
						$scope.pages.splice(i, 1);
					}
				}
			} else {
				$scope.page.$remove(function() {
					$location.path('pages');
				});
			}
		};

		$scope.update = function() {
			$scope.page.detail = CKEDITOR.instances.detail.getData();
			$scope.page.$update(function() {
				$location.path('pages');
			}, function(errorResponse) {
				$scope.error = errorResponse.message;
			});
		};

		$scope.find = function() {
			$scope.pages = Pages.query();
		};

		$scope.findOne = function() {
			$scope.page = Pages.get({ 
				pageId: $routeParams.pageId
			}, function() {
				$scope.init();
			});
		};
	}
);