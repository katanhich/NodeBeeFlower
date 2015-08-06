'use strict';

//News service used to communicate News REST endpoints
angular.module('news').factory('News', ['$resource',
	function($resource) {
		return $resource('/admin/news/:newsId', { newsId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);