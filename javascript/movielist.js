var moviesApp = angular.module('moviesApp', ['ngResource']);

moviesApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

moviesApp.factory('moviesFactory', function($http) {
  return {
    getMovies: function() {
      return $http.get('http://localhost:3000/items/3.json').error(function(data, status, headers, config) {
        console.log("error? what error?");
      });
    }
  };
});

moviesApp.controller('moviesController', function($scope, moviesFactory) {
  $scope.movies = function () {
    var movies = [];
    moviesFactory.getMovies().success(function(data, status) {
      console.log("status: " + status);
      console.log(data);
    });
    for (var i=0; i < request.children.length; i++) {
      movie = request.children[i];
      movies.push(movie.data);
      console.log(movie);
    }   
    return movies;
  };

});

