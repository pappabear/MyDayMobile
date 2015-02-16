// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('myDayMobileApp', ['ionic', 'myDayMobileApp.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

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
                'menuContent': {
                    templateUrl: "templates/home.html"
                }
            }
        })
        .state('appmenu.today', {
            url: "/today",
            views: {
                'menuContent': {
                    templateUrl: "templates/today.html",
                    controller: "TodayController"
                }
            }
        })
        .state('appmenu.tomorrow', {
            url: "/tomorrow",
            views: {
                'menuContent': {
                    templateUrl: "templates/tomorrow.html",
                    controller: "TomorrowController"
                }
            }
        })
        .state('appmenu.someday', {
            url: "/someday",
            views: {
                'menuContent': {
                    templateUrl: "templates/someday.html",
                    controller: "SomedayController"
                }
            }
        })

    $urlRouterProvider.otherwise("/tasks/home");
});