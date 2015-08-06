var app = angular.module('core');

app.controller('CartController', function($scope, $cookieStore, $location, $http, $routeParams) {

	$scope.tab = "customer";
	$scope.products = [];

	$scope.showTab = function(tab) {
		return $scope.tab === tab;
	};

	$scope.changeTab = function(tab) {
		$scope.tab = tab;
	};

	$scope.getTotalProduct = function() {
		var products = $cookieStore.get('mycart');
		if (products) {
			return products.length;
		} else {
			return 0;
		}
	};

	$scope.thanhtoan = function() {
		if ($scope.getTotalProduct() > 0) {
			$location.path('/thanhtoan')
		};
	};

	$scope.getOrderedProducts = function() {
		var products = $cookieStore.get('mycart');
		$http.post('/products/find_ordered_products', {ids: products} ).success(
			function(data) {
				data.forEach(function(product) {
					product.quality = 1;
				});

				$scope.products = data;
		})
	};

	$scope.countTotalMoney = function() {
		var total = 0;
		$scope.products.forEach(function(product) {
			total += product.totalMoney;
		});
		return total;
	};

	$scope.removeProduct = function(product) {
		// remove in cookie
		var cookieProducts = $cookieStore.get('mycart');
		for (var i in cookieProducts) {
			if (cookieProducts[i] === product._id) {
				cookieProducts.splice(i, 1);
			}
		}
		$cookieStore.put('mycart', cookieProducts);

		// remove in scope
		for (var i in $scope.products) {
			if ($scope.products[i]._id === product._id) {
				$scope.products.splice(i, 1);
			}
		}
	};

	$scope.sendOrder = function() {
		if ($scope.products.length > 0) {
			var receiveHour = $scope.order.receive_time.split(':')[0];
			var receiveMinutes = $scope.order.receive_time.split(':')[1];
			$scope.order.receive_date.setHours(receiveHour);
			$scope.order.receive_date.setMinutes(receiveMinutes);

			delete $scope.order.receive_time;

			$scope.order.products = $scope.products;

			$http.post('/cart/order', $scope.order).
				success(function(data) {
					$scope.order.id = data.id;
					$cookieStore.put('mycart', []);
					$location.path('/order_success').search('id', data.id);
				}).
				error(function(data) {
					alert('Cannot process your order')
				});
		} else {
			alert('Your cart is empty, please choose products')
		}
	};

	$scope.getOrderedId = function() {
		$scope.orderedId = $location.search().id;
	};

	$scope.findOne = function() {
		$http.get('/cart/' + $routeParams.id).
			success(function(data) {
				$scope.order = data;
			}) 
	};
});

app.directive('orderedProduct', function ($compile) {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: '/modules/core/views/ordered-product.html',
		link: function(scope, element) {
			var product = scope.product;

			scope.countTotal = function() {
				var price = (product.deal_price) ? product.deal_price : product.price;
				product.totalMoney = price * product.quality;
				return product.totalMoney;
			};
		}
	}
});