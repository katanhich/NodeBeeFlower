/**
 * Created by Cao Hong Phuoc on 6/24/2015.
 */
'use strict';

angular.module('core').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/modules/admin/typecategories/views/typecategories.client.view.html'
            })
    }
])

