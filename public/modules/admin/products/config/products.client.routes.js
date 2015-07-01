'use strict';

//Setting up route
angular.module('products').config(['$routeProvider',
	function($routeProvider) {
		// Products state routing
		$routeProvider.
			when('/products', {
				templateUrl: '/modules/admin/products/views/list-products.client.view.html'
			}).
			when('/products/create', {
				templateUrl: '/modules/admin/products/views/create-product.client.view.html'
			}).
			when('/products/:productId/edit', {
				templateUrl: '/modules/admin/products/views/edit-product.client.view.html'
			});
	}
]);
