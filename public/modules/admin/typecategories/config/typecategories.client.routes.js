/**
 * Created by Cao Hong Phuoc on 6/24/2015.
 */
'use strict';
 
angular.module('typecategories').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/typecategories', {
                templateUrl: '/modules/admin/typecategories/views/typecategories.client.view.html'
            }).
            when('/typecategories/create', {
                templateUrl: '/modules/admin/typecategories/views/create-typecategory.client.view.html'
            }).
            when('/typecategories/:typeCategoryId/edit', {
                templateUrl: '/modules/admin/typecategories/views/edit-typecategory.client.view.html'
            })
    }
])
