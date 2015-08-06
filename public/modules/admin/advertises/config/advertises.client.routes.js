'use strict';

//Setting up route
angular.module('advertises').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/advertises', {
			templateUrl: '/modules/admin/advertises/views/list-advertises.client.view.html'
		}).
		when('/advertises/create', {
			templateUrl: '/modules/admin/advertises/views/create-advertise.client.view.html'
		}).
		when('/advertises/:advertiseId/edit', {
			templateUrl: '/modules/admin/advertises/views/edit-advertise.client.view.html'
		});
	}
]);