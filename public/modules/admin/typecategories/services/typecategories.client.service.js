/**
 * Created by Cao Hong Phuoc on 6/26/2015.
 */
'use strict';
 
angular.module('typecategories').factory('TypeCategories', ['$resource',
    function($resource) {
        return $resource('/admin/typecategories/:typeCategoryId', {
            typeCategoryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        })
    }
])
