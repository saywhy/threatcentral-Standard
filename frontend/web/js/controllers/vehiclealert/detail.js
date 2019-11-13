var myApp = angular.module("myApp", []);

myApp.controller("vehicleDetailCtrl", function($scope, $http, $filter) {

    $scope.init = function() {

        $scope.item_operation = "-1";

    };

    $scope.init();
});
