'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3/:idPerson', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope','Personen','$route',function($scope,Personen,$routeProvider) {

     $scope.person = Personen.load('http://localhost:63342/angular-seed/data/personen.json').getById($routeProvider.current.params.idPerson);



}]);