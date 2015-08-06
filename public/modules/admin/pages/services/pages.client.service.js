'use strict';

//News service used to communicate News REST endpoints
angular.module('pages').factory('Pages', ['$resource',
	function($resource) {
		return $resource('/admin/pages/:pageId', { 
			pageId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);