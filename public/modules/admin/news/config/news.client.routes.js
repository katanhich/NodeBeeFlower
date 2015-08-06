'use strict';

//Setting up route
angular.module('news').config(['$routeProvider',
	function($routeProvider) {
		// News state routing
		$routeProvider.
			when('/news', {
				templateUrl: '/modules/admin/news/views/list-news.client.view.html'
			}).
			when('/news/create', {
				templateUrl: '/modules/admin/news/views/create-news.client.view.html'
			}).
			when('/news/:newsId/edit', {
				templateUrl: '/modules/admin/news/views/edit-news.client.view.html'
			});
	}
]);