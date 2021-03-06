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

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

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
                    templateUrl: "templates/home.html",
                    controller: "HomeController"
                }
            }
        })
        .state('appmenu.today', {
            url: "/today",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/today.html",
                    controller: "TodayController"
                }
            }
        })
        .state('appmenu.tomorrow', {
            url: "/tomorrow",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/tomorrow.html",
                    controller: "TomorrowController"
                }
            }
        })
        .state('appmenu.someday', {
            url: "/someday",
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: "templates/someday.html",
                    controller: "SomedayController"
                }
            }
        })
        .state('appmenu.new', {
            url: "/new",
            views: {
                'menuContent' :{
                    templateUrl: "templates/new.html",
                    controller: "NewTodoController"
                }
            }
        })

    $urlRouterProvider.otherwise("/tasks/home");

    console.log('Deleting headers...');
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.useXDomain = true;

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

});