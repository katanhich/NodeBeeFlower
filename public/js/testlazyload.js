/**
 * Created by Cao Hong Phuoc on 7/4/2015.
 */
'use strict';

(function() {
var appModule = angular.module('TestLazyloadApp', []);

//appModule.constant('chunkSize', 50);

appModule.controller('TestLazyloadController', ['$scope', function($scope) {
    //$scope.products = [];
    //var currentIndex = 1;

    $scope.products = [
        {
            name: '11111'
        },
        {
            name: '2222'
        },
        {
            name: '333'
        }
    ];

    $scope.loadMoreRecords = function() {
        $http.get('/products/home', {params:{page: 1}}).success(function(products) {
            //var i = 0;
            //currentIndex++;
            //while (i < products.length) {
            //    $scope.products.push(products[i]);
            //    i++;
            //}
            //$scope.products = products;
            //console.log($scope.products)
        });
    };

    //$scope.loadMoreRecords();
}]);

//appModule.directive('whenScrollEnds', function() {
//    return {
//        restrict: "A",
//        link: function(scope, element, attrs) {
//            var visibleHeight = element.height();
//            var threshold = 100;
//
//            element.scroll(function() {
//                var scrollableHeight = element.prop('scrollHeight');
//                var hiddenContentHeight = scrollableHeight - visibleHeight;
//
//                if (hiddenContentHeight - element.scrollTop() <= threshold) {
//                    // Scroll is almost at the bottom. Loading more rows
//                    scope.$apply(attrs.whenScrollEnds);
//                }
//            });
//        }
//    };
//});

})();