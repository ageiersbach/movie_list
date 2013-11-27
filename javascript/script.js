// Code goes here
var app = angular.module('app', ['ngResource']);
var root = 'http://localhost:3000/items';
var parent_id = 'Yq9pgW3EML4CAQHYkMk5ow';

app.factory('Movies', function($resource) {
  var MoviesService = $resource(root + '/:id.json', {id: '@id'}, {
    'get': {method: 'GET'},
    'update':{method: 'PUT'},
    'create':{method: 'POST'}
  });
  return MoviesService;
});

app.controller('mycontroller', function($scope, Movies) {
  
  var mdata = Movies.get({id: parent_id});
  mdata.$promise.then(function(data) {
    $scope.movies = data.children;
  }); 
  
  $scope.upVote = function (movie_id, index) {
    var item = Movies.get({id:movie_id});
    item.$promise.then(function(data) {
      var v = parseInt(item.data.votes) + 1;
      item.data.votes = v;
      item.$update({id:movie_id});
      $scope.movies[index].data.votes = v;
    });
  };
  
  $scope.downVote = function(movie_id, index) {
    var movie = Movies.get({id:movie_id});
    movie.$promise.then(function(data) {
      var votes = parseInt(movie.data.votes) -1
      movie.data.votes = votes;
      movie.$update({id:movie_id});
      $scope.movies[index].data.votes = votes;
    })
  };
  $scope.addMovie = function(movie_name) {
    //alert("let's add " + movie_name);  
    var item = {"item":{"parent_id": parent_id}};
    var movie = Movies.create(item);
    var token = "";
    movie.$promise.then(function(data) {
      token = movie.token;
      movie.data.title = movie_name;
      movie.data.votes = 0;
      movie.$update({id:token});
    });
    $scope.movies.push(movie);
  };
});
