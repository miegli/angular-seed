'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','Personen',function($scope,Personen) {


      var personenRepository = new Personen();

      $scope.personen = personenRepository.getAll();


      $scope.addPerson = function() {
        personenRepository.addPerson();
      }

      $scope.save = function() {
        personenRepository.save();
      }



}]);