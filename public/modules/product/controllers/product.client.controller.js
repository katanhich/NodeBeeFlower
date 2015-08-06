/**
 * Created by Cao Hong Phuoc on 7/4/2015.
 */
'use strict';

var homeUrl = '/products/home';
var categoryUrl = '/products/category/';
 
angular.module('products').controller('ProductsController', 
    function($scope, $http, $routeParams, $cookieStore) {
        $scope.isLoading = false;
        $scope.isFinished = false;
        $scope.products1 = [];
        $scope.products2 = [];
        $scope.products3 = [];
        $scope.products4 = [];
        $scope.currentPage = 1;
        $scope.url;

        $scope.loadMoreRecords = function() {
            if (!$scope.isFinished && !$scope.isLoading) {
                $scope.isLoading = true;

                $http.get($scope.url, {params:{page: $scope.currentPage}}).success(function(products) {
                    if (products.length > 0) {
                        for(var i=0; i < products.length; i = i+4){
                            if (products.length > i) {
                                $scope.products1.push(products[i]);
                            }

                            if (products.length > (i+1)) {
                                $scope.products2.push(products[i+1]);
                            }

                            if (products.length > (i+2)) {
                                $scope.products3.push(products[i + 2]);
                            }

                            if (products.length > (i+3)) {
                                $scope.products4.push(products[i + 3]);
                            }
                        }
                    } else {
                        $scope.isFinished = true;
                    }

                    $scope.currentPage++;
                    $scope.isLoading = false;
                }).error(function() {
                    $scope.isLoading = false;
                });
            }
        };

        $scope.initHome = function() {
            $scope.url = homeUrl;
            $scope.loadMoreRecords();
        };

        $scope.findOne = function() {
            var productId = $routeParams.productId;
            $http.get('/products/' + productId).success(function(product) {
                $scope.product = product;

                var categoryId = product.categories[0]._id;
                var params = {productId: product._id, categoryId: categoryId};
                $http.get('/products/find_related', {params: params}).success(function(data) {
                        $scope.relatedProducts = data;
                })
            });
        };

        $scope.findByCategory = function() {
            $scope.url = categoryUrl + $routeParams.uname;
            $scope.loadMoreRecords();
        };

        $scope.addToCart = function(productId) {
            if (confirm('Do you want to add this product to your cart?')) {
                var mycart = $cookieStore.get('mycart');
                if (!mycart) {
                    mycart = [];
                }

                if (mycart.indexOf(productId) < 0) {
                    mycart.push(productId);
                }

                $cookieStore.put('mycart', mycart);
            } 
        };
    }
);
