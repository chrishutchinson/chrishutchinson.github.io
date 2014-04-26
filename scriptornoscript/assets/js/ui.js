function ScriptCtrl($scope) {

	$scope.libs = [
		{title: 'Angular', real: true, description: 'HTML enhanced for web apps!', url: 'https://angularjs.org/'},
		{title: 'Banana', real: true, description: 'Banana is an opensource javascript application framework designed to create pure desktop and mobile applications. ', url: 'http://bananajs.com/'},
		{title: 'Cola', real: true, description: 'Constraint-Based Layout in the Browser', url: 'http://marvl.infotech.monash.edu/webcola/'},
		{title: 'Bacon', real: true, description: 'A small functional reactive programming lib for JavaScript.', url: 'https://github.com/baconjs/bacon.js/tree/master'},
		{title: 'Three', real: true, description: 'JavaScript 3D library', url: 'http://threejs.org/'},
		{title: 'Kettle', real: true, description: 'A rapid, bottom-up approach to developing Backbone views', url: 'http://smelnikov.github.io/kettle/'},
		{title: 'Puddle', real: false, description: '', url: ''},
		{title: 'Zombie', real: true, description: 'Zombie.js is a lightweight framework for testing client-side JavaScript code in a simulated environment.', url: 'http://zombie.labnotes.org/'},
		{title: 'Raccoon', real: true, description: 'Raccoon is a small framework for creating server-side javascript applications', url: 'http://raccoon.keetology.com/'},
		{title: 'Grape', real: true, description: 'Dead simple dependency injection!', url: 'https://github.com/andyhmltn/grape-js'},
		{title: 'Shave', real: false, description: '', url: ''},
		{title: 'Plantpot', real: false, description: '', url: ''},
		{title: 'Aerial', real: false, description: '', url: ''},
		{title: 'Popcorn', real: true, description: 'The HTML5 Media Framework', url: 'http://popcornjs.org/'},
		{title: 'Pasta', real: true, description: 'Pasta is a function that helps you write JavaScript MVC applications functionally.', url: 'https://github.com/ympbyc/Pasta'},
		{title: 'Pyjama', real: false, description: '', url: ''},
		{title: 'Steak', real: false, description: '', url: ''},
		{title: 'Street', real: false, description: '', url: ''},
		{title: 'Corrupt', real: false, description: '', url: ''},
		{title: 'Door', real: false, description: '', url: ''},
		{title: 'Comedy', real: false, description: '', url: ''},
		{title: 'Smile', real: false, description: '', url: ''},
		{title: 'Colony', real: true, description: 'In-browser graphs representing the links between your Node.js code and its dependencies.', url: 'https://github.com/hughsk/colony'},
		{title: 'Fashion', real: false, description: '', url: ''},
		{title: 'Elder', real: false, description: '', url: ''},
		{title: 'Hybrid', real: false, description: '', url: ''},
		{title: 'Wallaby', real: false, description: '', url: ''},
		{title: 'Plastic', real: true, description: 'Plastic.js allow you to created chainable API with a syntax and usage similar to popular api\' like jQuery and underscore.', url: 'http://masyl.github.io/plastic.js/'},
		{title: 'Cloak', real: true, description: 'A network layer for HTML5 games using Node.js.', url: 'http://incompl.github.io/cloak/'},
	];

	$scope.lib = '';

	$scope.end = false;

	$scope.about = {
		title: '',
		description: '',
		show: false,
	};

	$scope.results = {
		correct: 0,
		incorrect: 0,
	};

	$scope.random = function() {
		if($scope.libs.length > 0){
			var rand = Math.floor(Math.random()*$scope.libs.length);
			$scope.lib = $scope.libs[rand];
			$scope.current = rand;
			return $scope.lib.title;
		}

		var voteTrue = document.getElementById('vote-true');
		var voteFalse = document.getElementById('vote-false');
		if(voteTrue !== null) voteTrue.remove();
		if(voteFalse !== null) voteFalse.remove();
		$scope.end = true;
		return '';
	};

	$scope.vote = function(type) {
		if(typeof $scope.lib !== 'undefined'){
			// Score the user
			$scope.results.correct += (type === $scope.lib.real ? 1 : 0);
			$scope.results.incorrect += (type !== $scope.lib.real ? 1 : 0);

			$scope.about.title = $scope.lib.title;
			if($scope.lib.real === true){
				// If it's real, add the description to the about section
				$scope.about.description = '"' + $scope.lib.description + '"'; 
				$scope.about.answer = $scope.lib.title + ' is a library, script or framework.';
			} else {
				// If it's not real, tell the user and invite them to tell me if they think the result is wrong
				$scope.about.description = ''; 
				$scope.about.answer = $scope.lib.title + ' is a not library, script or framework.';
			}
			$scope.about.show = true;
			$scope.about.url = $scope.lib.url;

			// Remove the voted one from the list so they don't get it again in a new randomised list
			$scope.libs.splice($scope.current, 1);

			// Generate a new random lib
			$scope.random();
		}
	};

	$scope.scores = function(type) {
		return $scope.results[type];
	}
}