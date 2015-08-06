/**
 * Created by Cao Hong Phuoc on 6/23/2015.
 */
'use strict';

var mainApplicationModuleName = 'beeflower';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'core',
    'users', 'typecategories', 'categories', 'products', 'advertises', 'ui.bootstrap', 
    'news', 'pages', 'ui.grid', 'cart'
]);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

angular.element(document).ready(function() {
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    angular.bootstrap(document, [mainApplicationModuleName]);
});
