var rand;

var scriptData = [
    {name: 'Angular', type: 'correct', description: 'HTML enhanced for web apps!', url: 'https://angularjs.org/'},
    {name: 'Banana', type: 'correct', description: 'Banana is an opensource javascript application framework designed to create pure desktop and mobile applications. ', url: 'http://bananajs.com/'},
    {name: 'Cola', type: 'correct', description: 'Constraint-Based Layout in the Browser', url: 'http://marvl.infotech.monash.edu/webcola/'},
    {name: 'Bacon', type: 'correct', description: 'A small functional reactive programming lib for JavaScript.', url: 'https://github.com/baconjs/bacon.js/tree/master'},
    {name: 'Three', type: 'correct', description: 'JavaScript 3D library', url: 'http://threejs.org/'},
    {name: 'Kettle', type: 'correct', description: 'A rapid, bottom-up approach to developing Backbone views', url: 'http://smelnikov.github.io/kettle/'},
    {name: 'Puddle', type: 'incorrect', description: '', url: ''},
    {name: 'Zombie', type: 'correct', description: 'Zombie.js is a lightweight framework for testing client-side JavaScript code in a simulated environment.', url: 'http://zombie.labnotes.org/'},
    {name: 'Raccoon', type: 'correct', description: 'Raccoon is a small framework for creating server-side javascript applications', url: 'http://raccoon.keetology.com/'},
    {name: 'Grape', type: 'correct', description: 'Dead simple dependency injection!', url: 'https://github.com/andyhmltn/grape-js'},
    {name: 'Shave', type: 'incorrect', description: '', url: ''},
    {name: 'Plantpot', type: 'incorrect', description: '', url: ''},
    {name: 'Aerial', type: 'incorrect', description: '', url: ''},
    {name: 'Popcorn', type: 'correct', description: 'The HTML5 Media Framework', url: 'http://popcornjs.org/'},
    {name: 'Pasta', type: 'correct', description: 'Pasta is a function that helps you write JavaScript MVC applications functionally.', url: 'https://github.com/ympbyc/Pasta'},
    {name: 'Pyjama', type: 'incorrect', description: '', url: ''},
    {name: 'Steak', type: 'incorrect', description: '', url: ''},
    {name: 'Street', type: 'incorrect', description: '', url: ''},
    {name: 'Corrupt', type: 'incorrect', description: '', url: ''},
    {name: 'Door', type: 'incorrect', description: '', url: ''},
    {name: 'Comedy', type: 'incorrect', description: '', url: ''},
    {name: 'Smile', type: 'incorrect', description: '', url: ''},
    {name: 'Colony', type: 'correct', description: 'In-browser graphs representing the links between your Node.js code and its dependencies.', url: 'https://github.com/hughsk/colony'},
    {name: 'Fashion', type: 'incorrect', description: '', url: ''},
    {name: 'Elder', type: 'incorrect', description: '', url: ''},
    {name: 'Hybrid', type: 'incorrect', description: '', url: ''},
    {name: 'Wallaby', type: 'incorrect', description: '', url: ''},
    {name: 'Plastic', type: 'correct', description: 'Plastic.js allow you to created chainable API with a syntax and usage similar to popular api\' like jQuery and underscore.', url: 'http://masyl.github.io/plastic.js/'},
    {name: 'Cloak', type: 'correct', description: 'A network layer for HTML5 games using Node.js.', url: 'http://incompl.github.io/cloak/'},
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

    $scope.guess = function(type) {
      // Score
      if($scope.current.type == type){
        $scope.score.right += 1;
        $scope.result = 'Correct!';
      } else {
        $scope.score.wrong += 1;
        $scope.result = 'Incorrect!';
      }

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
    };
  }]);