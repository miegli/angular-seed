'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3/:idPerson', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope','Personen','$route',function($scope,Personen,$routeProvider) {

      var personenRepository = new Personen();

      $scope.person = personenRepository.getById($routeProvider.current.params.idPerson);


}]);