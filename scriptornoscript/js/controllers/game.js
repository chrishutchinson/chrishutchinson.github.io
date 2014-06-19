var rand;

var scriptData = [
    {name: 'Angular', type: 'script', description: 'HTML enhanced for web apps!', url: 'https://angularjs.org/'},
    {name: 'Banana', type: 'script', description: 'Banana is an opensource javascript application framework designed to create pure desktop and mobile applications. ', url: 'http://bananajs.com/'},
    {name: 'Cola', type: 'script', description: 'Constraint-Based Layout in the Browser', url: 'http://marvl.infotech.monash.edu/webcola/'},
    {name: 'Bacon', type: 'script', description: 'A small functional reactive programming lib for JavaScript.', url: 'https://github.com/baconjs/bacon.js/tree/master'},
    {name: 'Three', type: 'script', description: 'JavaScript 3D library', url: 'http://threejs.org/'},
    {name: 'Kettle', type: 'script', description: 'A rapid, bottom-up approach to developing Backbone views', url: 'http://smelnikov.github.io/kettle/'},
    {name: 'Puddle', type: 'noscript', description: '', url: ''},
    {name: 'Zombie', type: 'script', description: 'Zombie.js is a lightweight framework for testing client-side JavaScript code in a simulated environment.', url: 'http://zombie.labnotes.org/'},
    {name: 'Raccoon', type: 'script', description: 'Raccoon is a small framework for creating server-side javascript applications', url: 'http://raccoon.keetology.com/'},
    {name: 'Grape', type: 'script', description: 'Dead simple dependency injection!', url: 'https://github.com/andyhmltn/grape-js'},
    {name: 'Shave', type: 'noscript', description: '', url: ''},
    {name: 'Plantpot', type: 'noscript', description: '', url: ''},
    {name: 'Aerial', type: 'noscript', description: '', url: ''},
    {name: 'Popcorn', type: 'script', description: 'The HTML5 Media Framework', url: 'http://popcornjs.org/'},
    {name: 'Pasta', type: 'script', description: 'Pasta is a function that helps you write JavaScript MVC applications functionally.', url: 'https://github.com/ympbyc/Pasta'},
    {name: 'Pyjama', type: 'noscript', description: '', url: ''},
    {name: 'Steak', type: 'noscript', description: '', url: ''},
    {name: 'Street', type: 'noscript', description: '', url: ''},
    {name: 'Corrupt', type: 'noscript', description: '', url: ''},
    {name: 'Door', type: 'noscript', description: '', url: ''},
    {name: 'Comedy', type: 'noscript', description: '', url: ''},
    {name: 'Smile', type: 'noscript', description: '', url: ''},
    {name: 'Colony', type: 'script', description: 'In-browser graphs representing the links between your Node.js code and its dependencies.', url: 'https://github.com/hughsk/colony'},
    {name: 'Fashion', type: 'noscript', description: '', url: ''},
    {name: 'Elder', type: 'noscript', description: '', url: ''},
    {name: 'Hybrid', type: 'noscript', description: '', url: ''},
    {name: 'Wallaby', type: 'noscript', description: '', url: ''},
    {name: 'Plastic', type: 'script', description: 'Plastic.js allow you to created chainable API with a syntax and usage similar to popular api\' like jQuery and underscore.', url: 'http://masyl.github.io/plastic.js/'},
    {name: 'Cloak', type: 'script', description: 'A network layer for HTML5 games using Node.js.', url: 'http://incompl.github.io/cloak/'},
  ]

angular.module('SONS')
  .controller('GameCtrl', ['$scope', '$rootScope', '$cookieStore', function($scope, $rootScope, $cookieStore) {

    $rootScope.best = $cookieStore.get('best');

    if(!$rootScope.best){
      $rootScope.best = 0;
    }

    $scope.scripts = Object.create(scriptData);

    rand = Math.floor(Math.random()*$scope.scripts.length);
    $scope.current = $scope.scripts[rand];

    $scope.score = [];
    $scope.score.right = 0;
    $scope.score.wrong = 0;

    $scope.end = false;

    $scope.guesses = [];

    $scope.guess = function(type) {
      // Score
      if($scope.current.type == type){
        $scope.score.right += 1;
        $scope.result = 'Correct!';
      } else {
        $scope.score.wrong += 1;
        $scope.result = 'Incorrect!';
      }

      $scope.guesses.push({ name: $scope.current.name, said: type, actual: $scope.current.type, result: $scope.result });

      // Description
      if($scope.current.description == ''){
        $scope.description = $scope.current.name + ' is not a script';
      } else {
        $scope.description = $scope.current.description;
      }

      // Remove the item from the scripts array
      $scope.scripts.splice(rand, 1);

      // Next!
      if($scope.scripts.length > 0){
        // Generate a new current item
        rand = Math.floor(Math.random()*$scope.scripts.length);
        $scope.current = $scope.scripts[rand];
      } else {
        // End the game
        $scope.end = true;

        if($scope.score.right > $rootScope.best) {
          $rootScope.best = $scope.score.right;
          $cookieStore.put('best', $rootScope.best);
        }
      }
    };

    // Reset the game
    $scope.reset = function() {
      $scope.scripts = Object.create(scriptData);

      rand = Math.floor(Math.random()*$scope.scripts.length);
      $scope.current = $scope.scripts[rand];

      $scope.score = [];
      $scope.score.right = 0;
      $scope.score.wrong = 0;

      $scope.end = false;

      $scope.result = '';
      $scope.description = '';

      $scope.guesses = [];
    };
  }]);