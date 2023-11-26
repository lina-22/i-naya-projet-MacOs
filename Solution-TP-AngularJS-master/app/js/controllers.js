'use strict';

var controllers = angular.module('controllers', ['ngRoute', 'services']);

controllers.controller('ContactsListCtrl', ['$scope', 'Contact', function($scope, Contact) {
    $scope.listIsLoading = true;
    $scope.contacts = Contact.query({}, function() {
        $scope.listIsLoading = false;
    }, function(response) {
        $scope.listIsLoading = false;
        $scope.msg = response.data;
        console.warn(response);
    });
}]);

controllers.controller('ContactsDetailCtrl', ['$scope', '$location', '$routeParams', '$interval', 'Contact', function ($scope, $location, $routeParams, $interval, Contact) {
    $scope.contactIsLoading = true;
    $scope.contact = Contact.get($routeParams, function() {
        $scope.contactIsLoading = false;
    }, function(response) {
        $scope.contactIsLoading = false;
        $scope.msg = response.data;
        console.warn(response);
    });
    $scope.deleting = false;
    $scope.delete = function() {
        $scope.deleting = true;
        $scope.contact.$delete({}, function() {
            $location.path('/');
        }, function(response) {
            $scope.deleting = false;
            $scope.msg = response.data;
            console.warn(response);
        });
    };
    $scope.now = new Date();
    var timer = $interval(function() {
        $scope.now = new Date();
    }, 1000);
    $scope.$on('$destroy', function() {
        $interval.cancel(timer);
    })
}]);

controllers.controller('ContactsEditCtrl', ['$scope', '$routeParams', 'Contact', 'contactEditor', function($scope, $routeParams, Contact, contactEditor) {
    $scope.contact = Contact.get($routeParams, function() {
        $scope.loading = false;
    }, function(response) {
        $scope.loading = false;
        $scope.msg = response.data;
        console.warn(response);
    });
    $scope.loading = true;
    $scope.saving = false;
    contactEditor.addBehavior($scope);
}]);

controllers.controller('ContactsNewCtrl', ['$scope', 'Contact', 'contactEditor', function($scope, Contact, contactEditor) {
    $scope.contact = new Contact();
    $scope.contact.fields = [];
    $scope.loading = false;
    $scope.saving = false;
    contactEditor.addBehavior($scope);
}]);
