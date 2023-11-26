'use strict';

var app = angular.module('contacts', ['ngRoute', 'controllers', 'directives', 'filters']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/list.html',
            controller: 'ContactsListCtrl'
        })
        .when('/new', {
            templateUrl: 'views/edit.html',
            controller: 'ContactsNewCtrl'
        })
        .when('/:id', {
            templateUrl: 'views/detail.html',
            controller: 'ContactsDetailCtrl'
        })
        .when('/:id/edit', {
            templateUrl: 'views/edit.html',
            controller: 'ContactsEditCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
