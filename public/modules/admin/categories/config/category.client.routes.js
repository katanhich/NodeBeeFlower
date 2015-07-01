/**
 * Created by Cao Hong Phuoc on 6/24/2015.
 */
'use strict';
 
angular.module('categories').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/categories', {
                templateUrl: '/modules/admin/categories/views/categories.client.view.html'
            }).
            when('/categories/create', {
                templateUrl: '/modules/admin/categories/views/create-category.client.view.html'
            }).
            when('/categories/:categoryId/edit', {
                templateUrl: '/modules/admin/categories/views/edit-category.client.view.html'
            })

    }
])
