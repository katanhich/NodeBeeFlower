/**
 * Created by Cao Hong Phuoc on 6/26/2015.
 */
'use strict';
 
angular.module('categories').controller('CategoriesController', ['$scope', '$routeParams', '$location',
    'Authentication', 'Categories', 'TypeCategories',
    function($scope, $routeParams, $location, Authentication, Categories, TypeCategories) {
        $scope.authentication = Authentication;

        if (!Authentication.user) $location.path('/admin/login');

        $scope.initEdit = function() {
            this.findType();
            this.findOne();
        }

        $scope.findType = function() {
            $scope.typecategories = TypeCategories.query();
        }

        $scope.find = function() {
            $scope.categories = Categories.query();
        }

        $scope.findOne = function() {
            $scope.category = Categories.get({
                categoryId: $routeParams.categoryId
            });
        }

        $scope.create = function() {
            var newCategory = new Categories($scope.category);

            newCategory.$save(function(){
                $location.path('/categories');
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

        $scope.delete = function(category) {
            if (category) {
                category.$remove(function(){
                    for (var i in $scope.categories) {
                        if ($scope.categories[i] === category) {
                            $scope.categories.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.category.$remove(function() {
                    $location.path('categories')
                })
            }
        }
    }
])
