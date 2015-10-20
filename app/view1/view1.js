'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','Personen',function($scope,Personen) {

      $scope.personen = Personen.getAll();
console.log(Personen);
      $scope.addPerson = function() {
          Personen.addPerson();
      }

      $scope.save = function() {
          Personen.save();
      }



}]);