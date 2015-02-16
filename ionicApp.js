angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
	.state('signin', {
      url: '/signin',
      templateUrl: 'templates/signin.html',
      controller: 'SignInController'
    })
    .state('appmenu', {
      url: "/tasks",
      abstract: true,
      templateUrl: "templates/task-menu.html"
    })
    .state('appmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })
    .state('appmenu.today', {
      url: "/today",
      views: {
        'menuContent' :{
          templateUrl: "templates/today.html",
          controller: "TodayController"
        }
      }
    })
    .state('appmenu.tomorrow', {
      url: "/tomorrow",
      views: {
        'menuContent' :{
          templateUrl: "templates/tomorrow.html",
          controller: "TomorrowController"
        }
      }
    })
    .state('appmenu.someday', {
      url: "/someday",
      views: {
        'menuContent' :{
          templateUrl: "templates/someday.html",
          controller: "SomedayController"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/tasks/home");
})

.controller('SignInController', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('username=', user.username);
	console.log('password=', user.password);
    $state.go('appmenu.home');
  };
  
})

.controller('TodayController', function($scope, $ionicSideMenuDelegate, $timeout) {
  $scope.items = [
    { text: "clean downstairs", checked: true },
    { text: "work on training Molly", checked: false },
    { text: "pick the backyard / clean garage / clean barn", checked: false }
  ];
  
  //$scope.toggleLeft = function() {
  //  $ionicSideMenuDelegate.toggleLeft();
  //};

  $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
	  var s = 'New Item ' + Math.floor(Math.random() * 1000) + 4;
      $scope.items.push({ text: s, checked: false });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };

})

.controller('TomorrowController', function($scope) {
	//alert('got in tomorrow');
	$scope.items = [
    { text: "clean downstairs", checked: true },
    { text: "work on training Molly", checked: false },
    { text: "pick the backyard / clean garage / clean barn", checked: false }
  ];
  
})

.controller('SomedayController', function($scope, $state) {
	//alert('got in someday');
	console.log('Simulating that no auth token is present and we say NO you better login...');
	$state.go('signin');
});
