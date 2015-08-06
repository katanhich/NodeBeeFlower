angular.module('cart').config(function($routeProvider) {
	return $routeProvider.
	when('/cart', {
		templateUrl: '/modules/admin/cart/views/list-cart.client.view.html'
	}).
	when('/cart/:cartId/edit', {
		templateUrl: '/modules/admin/cart/views/edit-cart.client.view.html'
	});
});