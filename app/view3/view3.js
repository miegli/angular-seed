'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3/:idPerson', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope','Personen','$route',function($scope,Personen,$routeProvider) {

     $scope.person = Personen.loadFromCookie('_Personen').getById($routeProvider.current.params.idPerson);

     console.log($scope.person);

}]);