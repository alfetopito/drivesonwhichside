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
    getDrivingSide,
    getCountries;

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

  getDrivingSide = function (country) {
    return fetchCountriesPromise().then(function (data) {
      return data[country];
    });
  };

  getCountries = function () {
    return fetchCountriesPromise().then(function (data) {
      return Object.keys(data).sort();
    })
  };

  return {
    getDrivingSide: getDrivingSide,
    getCountries: getCountries
  };
}]);

// CONTROLLERS
app.controller('mainController', ['$scope', '$location', '$filter', 'countryFactory', '$log',
  function ($scope, $location, $filter, countryFactory, $log) {
    $scope.country = '';
    $scope.countryNames = [];
    countryFactory.getCountries().then(function (data) {
      $scope.countryNames = data;
    });
    $scope.submit = function () {
      if ($scope.country) {
        $location.path($scope.country);
      }
    };
    $scope.countryNameClick = function (name) {
      $scope.country = name;
      $scope.submit();
    };
}]);

app.controller('countryController', ['$routeParams', '$scope', '$location', 'countryFactory', '$log',
  function ($routeParams, $scope, $location, countryFactory, $log) {
    $scope.country = $routeParams.country || 'Brazil';
    countryFactory.getDrivingSide($scope.country).then(function (data) {
      $log.info('Country: ' + $scope.country);
      $scope.side = data;
      $log.info('Side: ' + $scope.side);
      if (!$scope.side) {
        $location.path('/');
      }
    });
}]);
