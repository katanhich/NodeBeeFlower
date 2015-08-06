/**
 * Created by Cao Hong Phuoc on 7/4/2015.
 */
'use strict';

var app = angular.module('products');

app.directive('productDescription', function() {
    return {
        restrict: 'E',
        templateUrl: '/modules/product/views/product-description.html'
    }
});

app.directive('productLazyload', function() {
    return {
        restrict: 'E',
        templateUrl: '/modules/product/views/products-lazyload.html'
    }
});


