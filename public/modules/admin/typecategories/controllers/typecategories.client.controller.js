/**
 * Created by Cao Hong Phuoc on 6/26/2015.
 */
'use strict';
 
angular.module('typecategories').controller('TypeCategoriesController', ['$scope', '$routeParams', '$location',
    'Authentication', 'TypeCategories',
    function($scope, $routeParams, $location, Authentication, TypeCategories) {
        $scope.authentication = Authentication;

        if (!Authentication.user) $location.path('/admin/login');

        $scope.find = function() {
            $scope.typecategories = TypeCategories.query();
        }

        $scope.findOne = function() {
            $scope.typecategory = TypeCategories.get({
                typeCategoryId: $routeParams.typeCategoryId
            });
        }

        $scope.create = function() {
            var typecategory = new TypeCategories({
                name: this.name,
                position: this.position
            });

            typecategory.$save(function(){
                $location.path('/typecategories');
            }, function(err) {
                $scope.error = err.data.message;
            })
        };

        $scope.update = function() {
            $scope.typecategory.$update(function() {
                $location.path('typecategories')
            }, function(err) {
                $scope.error = err.data.message;
            })
        }

        $scope.delete = function(typeCategory) {
            if (typeCategory) {
                typeCategory.$remove(function(){
                    for (var i in $scope.typecategories) {
                        if ($scope.typecategories[i] === typeCategory) {
                            $scope.typecategories.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.typecategory.$remove(function() {
                    $location.path('typecategories')
                })
            }
        }
    }
])
