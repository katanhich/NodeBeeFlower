/**
 * Created by Cao Hong Phuoc on 7/2/2015.
 */
'use strict';
 
angular.module('core').controller('AdvertisesController', ['$scope', '$http',
    function($scope, $http) {
        $scope.findByType = function(type, callback) {
            $http.get('/findAdvertiseByType', {params:{type: type}}).
                success(function (data) {
                   callback(data);
                });
        };

        $scope.findRightAdver = function() {
            $scope.findByType(2, function(data){
              $scope.rightAdvertises = data;
            })
        };

        $scope.findHomeAdver = function() {
            $scope.findByType(1, function(data) {
                $scope.mainAdvertise = data[0];
            })
        }
    }
])
