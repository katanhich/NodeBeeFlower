'use strict';

//Setting up route
angular.module('pages').config(['$routeProvider',
	function($routeProvider) {
		// pages state routing
		$routeProvider.
			when('/pages', {
				templateUrl: '/modules/admin/pages/views/list-pages.client.view.html'
			}).
			when('/pages/create', {
				templateUrl: '/modules/admin/pages/views/create-pages.client.view.html'
			}).
			when('/pages/:pageId/edit', {
				templateUrl: '/modules/admin/pages/views/edit-pages.client.view.html'
			});
	}
]);