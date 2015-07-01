/**
 * Created by Cao Hong Phuoc on 6/26/2015.
 */
'use strict';
 
angular.module('categories').factory('Categories', ['$resource',
    function($resource) {
        return $resource('/admin/categories/:categoryId', {
            categoryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        })
    }
])
