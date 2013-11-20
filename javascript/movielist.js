var moviesApp = angular.module('MoviesApp', ['myCollisterator']);
var myCollisterator = angular.module('myCollisterator', ['ngResource']);

myCollisterator.factory('Movies', ['$resource', function($resource) {
  $http.defaults.useXDomain = true;
  return $resource('http://localhost:3000/items/qPCnKiaz7lXI1V95SShmiw.json', {}, {
      query: {method:'GET'},
      post: {method:'POST'},
      update: {method:'PUT'},
      remove: {method: 'DELETE'}
    });
}]);

moviesApp.controller('moviesController', function($scope, moviesFactory) {
  $scope.movies = Movies.query();
});

