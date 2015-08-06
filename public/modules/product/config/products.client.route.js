/**
 * Created by Cao Hong Phuoc on 7/7/2015.
 */
'use strict';
 
angular.module('products').config(['$routeProvider', function($routeProvider) {
    return $routeProvider.
        when('/products/:productId', {
            templateUrl: '/modules/product/views/detail.client.view.html'
        }).
        when('/products/category/:uname', {
        	templateUrl: '/modules/product/views/products-category.html'
        });
}])
