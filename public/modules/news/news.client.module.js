/**
 * Created by Cao Hong Phuoc on 7/18/2015.
 */
'use strict';
 
var app = angular.module('news', []);

app.controller('NewsController', function($scope, $http, $routeParams) {
	$scope.isLoading = false;
	$scope.isFinished = false;
	$scope.news1 = [];
	$scope.news2 = [];
	$scope.news3 = [];
	$scope.news4 = [];
	$scope.currentPage = 1;

	$scope.loadMoreNews = function() {
	    if (!$scope.isFinished && !$scope.isLoading) {
	        $scope.isLoading = true;

	        $http.get('/news', {params:{page: $scope.currentPage}}).success(function(lnews) {
	            if (lnews.length > 0) {
	                for(var i=0; i < lnews.length; i = i+4){
	                    if (lnews.length > i) {
	                        $scope.news1.push(lnews[i]);
	                    }

	                    if (lnews.length > (i+1)) {
	                        $scope.news2.push(lnews[i+1]);
	                    }

	                    if (lnews.length > (i+2)) {
	                        $scope.news3.push(lnews[i + 2]);
	                    }

	                    if (lnews.length > (i+3)) {
	                        $scope.news4.push(lnews[i + 3]);
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

    $scope.findHome = function() {
        $http.get('/news/home').success(function(data) {
            $scope.latestNews = data;
        });
    };

    $scope.findOne = function() {
    	$http.get('/news/' + $routeParams.uname).success(function(data) {
    		$scope.news = data;
    	});
    };
});

app.config(function($routeProvider) {
	$routeProvider.
		when('/news/:uname', {
			templateUrl: '/modules/news/views/detail.client.view.html'
		});
});

app.directive('newsDescription', function() {
	return {
		restrict: 'E',
		templateUrl: '/modules/news/views/news-description.client.view.html'
	};
})