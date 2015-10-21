'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','Personen',function($scope,Personen) {



        $scope.personen = Personen.load('../data/personen.json').getAll();


        $scope.reload = function() {
            Personen.reload();
        };



    }]);