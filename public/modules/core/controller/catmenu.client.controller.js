/**
 * Created by Cao Hong Phuoc on 7/2/2015.
 */
'use strict';

angular.module('core').controller('CatMenuController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.find = function () {
            $http.get('/findTypesAndCategories').success(function (data, status, headers, config) {
                $scope.types = data;
            });
        }

        $scope.tab = 1;
        $scope.setTab = function(tab) {
            $scope.tab = tab;
        };
        $scope.isSelectedTab = function(tab) {
            return $scope.tab === tab;
        };
    }
])
