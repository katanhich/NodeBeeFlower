'use strict';

// Products controller
angular.module('products').controller('ProductsController', ['$scope', '$routeParams', '$location', 'Authentication',
	'Products', 'Upload', 'Categories',
	function($scope, $routeParams, $location, Authentication, Products, Upload, Categories) {
		$scope.authentication = Authentication;
		$scope.product = {};
		$scope.product.categories = [];
		$scope.pageSize = 5;
		$scope.currentPage = 1;
		$scope.offset = 0;

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		$scope.initEdit = function() {
			this.findCategories();
			this.findOne();
		}

		$scope.findCategories = function() {
			$scope.categories = Categories.query();
		};

		// store categories for new product
		$scope.addCategoryToProduct = function(category) {
			if ($scope.product.categories.indexOf(category) < 0) {
				$scope.product.categories.push(category);
			}
		}
		$scope.removeCategoryOutProduct = function(category) {
			for (var i = 0; i < $scope.product.categories.length; i++)
				if ($scope.product.categories[i]._id === category._id) {
					$scope.product.categories.splice(i,1);
					break;
				}
		}

		$scope.convertToProductCategories = function() {
			var tmp = [];
			for (var i = 0; i < $scope.product.categories.length; i++) {
				tmp.push($scope.product.categories[i]._id);
			}
			$scope.product.categories = tmp;
		}

		$scope.create = function() {
			$scope.convertToProductCategories();

			Upload.upload({
				url: '/admin/products',
				fields: $scope.product,
				file: $scope.thumbnail[0]
			}).success(function (data, status, headers, config) {
				$location.path('products');
			}).error(function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Update existing Product
		$scope.update = function() {
			$scope.convertToProductCategories();

			var file = null;
			if ($scope.thumbnail && $scope.thumbnail.length) {
				file = $scope.thumbnail[0];
			}

			Upload.upload({
				method: 'PUT',
				url: '/admin/products/' + $scope.product._id,
				fields: $scope.product,
				file: file
			}).success(function (data, status, headers, config) {
				$location.path('products');
			}).error(function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(product) {
			if ( product ) { 
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};

		$scope.tab = 1;
		$scope.selectTab = function(tab) {
			$scope.tab = tab;
		}
		$scope.isSelectTab = function(tab) {
			return $scope.tab === tab;
		}

		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $routeParams.productId
			});
		};

		$scope.searchProduct = function(product) {
			$location.path('products/' + product._id + '/edit')
		};

	}
]);
