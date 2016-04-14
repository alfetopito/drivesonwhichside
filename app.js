// MODULE
var drivesWhere = angular.module('drivesWhere', ['ngRoute']);

drivesWhere.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/main.html',
    controller: 'mainController',
    controllerAs: 'mainC'
  })
  .when('/:country', {
    templateUrl: 'pages/country.html',
    controller: 'countryController',
    controllerAs: 'countryC'
  });
});

// SERVICES
drivesWhere.service('searchCountry', [function () {
  
}]);

// CONTROLLERS
drivesWhere.controller('mainController', ['$location', function ($location) {
  this.submit = function () {
    if (this.country) {
      $location.path(this.country);
    }
  }
}]);

drivesWhere.controller('countryController', ['$routeParams', function ($routeParams) {
  this.country = $routeParams.country || 'Brazil';
}]);
