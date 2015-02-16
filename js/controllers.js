angular.module('myDayMobileApp.controllers', [])

    .controller('SignInController', function ($scope, $state) {

        $scope.signIn = function (user) {
            console.log('username=', user.username);
            console.log('password=', user.password);
            $state.go('appmenu.home');
        };

    })

    .controller('TodayController', function ($scope, $ionicSideMenuDelegate, $timeout, $http) {

        function getData()
        {
            $scope.items = [];
            $http( { method: 'GET', $$asyncCallback:false,
                url: 'http://myday.herokuapp.com/today.json?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    console.log('$http success');
                    angular.forEach(data, function(todo)
                    {
                        var item = { id: todo.id, text: todo.subject, checked: todo.is_complete };
                        $scope.items.push(item);
                    });
                    //cordova.plugins.notification.badge.set($scope.incompleteItems);
                })
                .error(function(data, status, headers, config) {
                    alert('error in $http get');
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                });

        }


        function markComplete(id)
        {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_complete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    // do something?
                })
                .error(function(data, status, headers, config)
                {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function(data, status, headers, config)
                {
                    // do something?
                });

        }


        function markIncomplete(id)
        {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_incomplete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    // do something?
                })
                .error(function(data, status, headers, config)
                {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function(data, status, headers, config)
                {
                    // do something?
                });

        }


        $scope.doRefresh = function ()
        {

            console.log('user initiated refreshing...');
            $timeout(function () {
                getData();
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };


        $scope.check = function(id)
        {

            angular.forEach($scope.items, function(o)
            {
                if (o.id == id)
                {
                    if (o.checked == false)
                    {
                        markIncomplete(id);
                    }
                    else
                    {
                        markComplete(id);
                    }
                }
            });

        }


        // do this to load the page data
        getData();

    })

    .controller('TomorrowController', function ($scope, $ionicSideMenuDelegate, $timeout, $http) {

        function getData()
        {
            $scope.items = [];
            $http( { method: 'GET', $$asyncCallback:false,
                url: 'http://myday.herokuapp.com/tomorrow.json?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    console.log('$http success');
                    angular.forEach(data, function(todo)
                    {
                        var item = { id: todo.id, text: todo.subject, checked: todo.is_complete };
                        $scope.items.push(item);
                    });
                    //cordova.plugins.notification.badge.set($scope.incompleteItems);
                })
                .error(function(data, status, headers, config) {
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                });

        }


        function markComplete(id)
        {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_complete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    // do something?
                })
                .error(function(data, status, headers, config)
                {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function(data, status, headers, config)
                {
                    // do something?
                });

        }


        function markIncomplete(id)
        {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_incomplete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    // do something?
                })
                .error(function(data, status, headers, config)
                {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function(data, status, headers, config)
                {
                    // do something?
                });

        }


        $scope.doRefresh = function ()
        {

            console.log('user initiated refreshing...');
            $timeout(function () {
                getData();
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };


        $scope.check = function(id)
        {

            angular.forEach($scope.items, function(o)
            {
                if (o.id == id)
                {
                    if (o.checked == false)
                    {
                        markIncomplete(id);
                    }
                    else
                    {
                        markComplete(id);
                    }
                }
            });

        }


        // do this to load the page data
        getData();

    })

    .controller('SomedayController', function ($scope, $ionicSideMenuDelegate, $timeout, $http) {

        function getData()
        {
            $scope.items = [];
            $http( { method: 'GET', $$asyncCallback:false,
                url: 'http://myday.herokuapp.com/backlog.json?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    console.log('$http success');
                    angular.forEach(data, function(todo)
                    {
                        var item = { id: todo.id, text: todo.subject, checked: todo.is_complete };
                        $scope.items.push(item);
                    });
                    //cordova.plugins.notification.badge.set($scope.incompleteItems);
                })
                .error(function(data, status, headers, config) {
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                });

        }


        function markComplete(id)
        {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_complete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    // do something?
                })
                .error(function(data, status, headers, config)
                {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function(data, status, headers, config)
                {
                    // do something?
                });

        }


        function markIncomplete(id)
        {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_incomplete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function(data, status, headers, config)
                {
                    // do something?
                })
                .error(function(data, status, headers, config)
                {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function(data, status, headers, config)
                {
                    // do something?
                });

        }


        $scope.doRefresh = function ()
        {

            console.log('user initiated refreshing...');
            $timeout(function () {
                getData();
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };


        $scope.check = function(id)
        {

            angular.forEach($scope.items, function(o)
            {
                if (o.id == id)
                {
                    if (o.checked == false)
                    {
                        markIncomplete(id);
                    }
                    else
                    {
                        markComplete(id);
                    }
                }
            });

        }


        // do this to load the page data
        getData();

    });
