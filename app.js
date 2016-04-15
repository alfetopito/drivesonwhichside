// MODULE
var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
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

// FACTORIES
app.factory('countryFactory', ['$http', '$log', '$q', function ($http, $log) {
  var countriesPromise = null,
    fetchCountriesPromise,
    getCountry;

  fetchCountriesPromise = function () {
    $log.debug('fetching promise');
    if (!countriesPromise) {
      $log.debug('promise doesnt exist yet');
      countriesPromise = $http.get('countries.json').then(function (response) {
        $log.debug('fetched file');
        return response.data;
      });
    }
    return countriesPromise;
  };

  getCountry = function (country) {
    return fetchCountriesPromise().then(function (data) {
      return data[country];
    });
  };

  return {
    getCountry: getCountry
  };
}]);

// CONTROLLERS
app.controller('mainController', ['$location', 'countryFactory',
  function ($location, countryFactory) {
    countryFactory.getCountry('a');
    this.submit = function () {
      if (this.country) {
        $location.path(this.country);
      }
    }
}]);

app.controller('countryController', ['$routeParams', '$scope', '$log', 'countryFactory',
  function ($routeParams, $scope, $log, countryFactory) {
    $scope.country = $routeParams.country || 'Brazil';
    countryFactory.getCountry($scope.country).then(function (data) {
      $scope.side = data;
    });
}]);
