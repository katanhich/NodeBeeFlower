/**
 * Created by Cao Hong Phuoc on 7/7/2015.
 */
'use strict';
 
angular.module('core').config(['$routeProvider', function($routeProvider) {
    return $routeProvider.
        when('/', {
            templateUrl: '/modules/core/views/home.client.view.html'
        }).
        when('/news', {
        	templateUrl: '/modules/news/views/list.client.view.html' 
        }).
        when('/page/:link', {
        	templateUrl: '/modules/core/views/page.client.view.html'
        }).
        when('/thanhtoan', {
            templateUrl: '/modules/core/views/thanhtoan.client.view.html'
        }).
        when('/order_success', {
           templateUrl: '/modules/core/views/thanhtoan_thanhcong.client.view.html' 
        }).
        when('/cart/check/:id', {
           templateUrl: '/modules/core/views/check-cart.client.view.html' 
        });
}])
