'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','Personen',function($scope,Personen) {

      $scope.personen = Personen.load('http://localhost:63342/angular-seed/data/personen.json').getAll();


      $scope.addPerson = function() {
          Personen.add();
      }

      $scope.save = function() {
          Personen.save();
      }

      $scope.remove = function(person) {
          Personen.removePerson(person);
      }

      $scope.reload = function() {
          Personen.reload();
      }



}]);