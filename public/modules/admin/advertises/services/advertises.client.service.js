'use strict';

//Advertises service used to communicate Advertises REST endpoints
angular.module('advertises').factory('Advertises', ['$resource',
	function($resource) {
		return $resource('advertises/:advertiseId', { advertiseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);