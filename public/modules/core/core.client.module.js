/**
 * Created by Cao Hong Phuoc on 7/2/2015.
 */
'use strict';
 
var app = angular.module('core', []);

app.directive('whenScrollEnds', function($window) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var threshold = 100;
            var windowEl = angular.element($window);

            angular.element($window).bind("scroll", function() {
                if (element.prop('scrollHeight') - windowEl.scrollTop() <= threshold) {
                    scope.$apply(attrs.whenScrollEnds);
                }
            });
        }
    };
});