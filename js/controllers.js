
angular.module('myDayMobileApp.controllers', [])


    .controller('HomeController', function ($rootScope, $scope, $state, $ionicModal, $http) {

        // set up the modal
        $ionicModal.fromTemplateUrl('templates/signin.html',
            {
                scope: $scope,
                animation: 'slide-in-up'
            })
            .then(function (modal)
            {
                $scope.modal = modal;
                showLoginOnNullUser();
            });

        $scope.openModal = function() {
            $scope.modal.show()
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        $scope.signIn = function (u) {
            var payload = {'user': {'email': u.username, 'password': u.password} };

            $http.post('http://myday.herokuapp.com/api/users/sign_in', payload)
                .success(function(data, status, headers, config)
                {
                    //console.log('success');
                    //console.log('success? =' + data.success);
                    //console.log('auth_token =' + data.auth_token);
                    localStorage.setItem('auth_token', data.auth_token);
                    $scope.modal.hide();
                })
                .error(function(data, status, headers, config)
                {
                    //console.log('error');
                    //console.log('success? =' + data.success);
                    alert('Credentials entered did not work.');
                    //$scope.modal.hide();
                })

        };

        showLoginOnNullUser = function () {
            if (!localStorage.getItem('auth_token'))
                $scope.openModal();
        };

        // http://forum.ionicframework.com/t/how-to-call-modal-show-on-controller-init/8550

    })

    .controller('TodayController', function ($scope, $ionicSideMenuDelegate, $timeout, $http, $state) {


        function getData() {
            $scope.items = [];
            $scope.incomplete = 0;
            $scope.total = 0;

            $http({ method: 'GET', $$asyncCallback: false,
                url: 'http://myday.herokuapp.com/today.json?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    console.log('$http success');
                    angular.forEach(data, function (todo) {
                        $scope.total++;
                        if (!todo.is_complete == true)
                            $scope.incomplete++;
                        var item = { id: todo.id, text: todo.subject, checked: todo.is_complete };
                        $scope.items.push(item);
                    });
                    //cordova.plugins.notification.badge.set($scope.incompleteItems);
                })
                .error(function (data, status, headers, config) {
                    alert('error in $http get');
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                });

        }


        function markComplete(id) {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_complete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    // do something?
                })
                .error(function (data, status, headers, config) {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function (data, status, headers, config) {
                    // do something?
                });
            $scope.incomplete--;
        }


        function markIncomplete(id) {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_incomplete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    // do something?
                })
                .error(function (data, status, headers, config) {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function (data, status, headers, config) {
                    // do something?
                });
            $scope.incomplete++;

        }


        $scope.add = function () {
            $state.go('appmenu.new');
        }


        $scope.doRefresh = function () {

            console.log('user initiated refreshing...');
            $timeout(function () {
                getData();
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };


        $scope.check = function (id) {

            angular.forEach($scope.items, function (o) {
                if (o.id == id) {
                    if (o.checked == false) {
                        markIncomplete(id);
                    }
                    else {
                        markComplete(id);
                    }
                }
            });

        }


        // do this to load the page data
        getData();

    })


    .controller('TomorrowController', function ($scope, $ionicSideMenuDelegate, $timeout, $http, $state) {

        function getData() {
            $scope.items = [];
            $http({ method: 'GET', $$asyncCallback: false,
                url: 'http://myday.herokuapp.com/tomorrow.json?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    console.log('$http success');
                    angular.forEach(data, function (todo) {
                        var item = { id: todo.id, text: todo.subject, checked: todo.is_complete };
                        $scope.items.push(item);
                    });
                    //cordova.plugins.notification.badge.set($scope.incompleteItems);
                })
                .error(function (data, status, headers, config) {
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                });

        }


        function markComplete(id) {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_complete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    // do something?
                })
                .error(function (data, status, headers, config) {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function (data, status, headers, config) {
                    // do something?
                });

        }


        function markIncomplete(id) {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_incomplete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    // do something?
                })
                .error(function (data, status, headers, config) {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function (data, status, headers, config) {
                    // do something?
                });

        }


        $scope.add = function () {
            $state.go('appmenu.new');
        }


        $scope.doRefresh = function () {

            console.log('user initiated refreshing...');
            $timeout(function () {
                getData();
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };


        $scope.check = function (id) {

            angular.forEach($scope.items, function (o) {
                if (o.id == id) {
                    if (o.checked == false) {
                        markIncomplete(id);
                    }
                    else {
                        markComplete(id);
                    }
                }
            });

        }


        // do this to load the page data
        getData();

    })


    .controller('SomedayController', function ($scope, $ionicSideMenuDelegate, $timeout, $http, $state) {

        function getData() {
            $scope.items = [];
            $http({ method: 'GET', $$asyncCallback: false,
                url: 'http://myday.herokuapp.com/backlog.json?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    console.log('$http success');
                    angular.forEach(data, function (todo) {
                        var item = { id: todo.id, text: todo.subject, checked: todo.is_complete };
                        $scope.items.push(item);
                    });
                    //cordova.plugins.notification.badge.set($scope.incompleteItems);
                })
                .error(function (data, status, headers, config) {
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                });

        }


        function markComplete(id) {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_complete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    // do something?
                })
                .error(function (data, status, headers, config) {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function (data, status, headers, config) {
                    // do something?
                });

        }


        function markIncomplete(id) {
            $http({
                method: 'PUT',
                url: 'http://myday.herokuapp.com/todos/mark_incomplete/' + id + '?auth_token=mjwiPdGEPqnAV8MiFfLp',
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
                .success(function (data, status, headers, config) {
                    // do something?
                })
                .error(function (data, status, headers, config) {
                    // do something?
                    console.log('error in $http get');
                    console.log('status=' + status);
                    console.log('headers=' + headers);
                    console.log('config=' + config);
                })
                .finally(function (data, status, headers, config) {
                    // do something?
                });

        }


        $scope.add = function () {
            $state.go('appmenu.new');
        }


        $scope.doRefresh = function () {

            console.log('user initiated refreshing...');
            $timeout(function () {
                getData();
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };


        $scope.check = function (id) {

            angular.forEach($scope.items, function (o) {
                if (o.id == id) {
                    if (o.checked == false) {
                        markIncomplete(id);
                    }
                    else {
                        markComplete(id);
                    }
                }
            });

        }


        // do this to load the page data
        getData();

    })


    .controller('NewTodoController', function ($scope, $state, $ionicSideMenuDelegate, $timeout, $http) {

        $scope.showForm = true;

        $scope.dates = [
            { text: 'Today', value: '1' },
            { text: 'Tomorrow', value: '2' },
            { text: 'Someday', value: '3' }
        ];

        $scope.todo = {};

        $scope.submit = function () {
            if (!$scope.todo.subject) {
                alert('Form cannot be left blank');
                return;
            }
            console.log('should be POSTing right now...');

            var today = new Date();
            var tomorrow = new Date(+new Date() + 86400000);
            var dt = null;
            if ($scope.todo.duedate == '1')
                dt = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
            else if ($scope.todo.duedate == '2')
                dt = tomorrow.getMonth() + 1 + '/' + tomorrow.getDate() + '/' + tomorrow.getFullYear();
            $scope.payload = {subject: $scope.todo.subject, is_complete: false, recurrence: 0, position: 1, due_date: dt};

            console.log('$scope.payload.subject=' + $scope.payload.subject);
            console.log('$scope.payload.duedate=' + $scope.payload.due_date);

            $http({
                method: 'POST',
                url: 'http://myday.herokuapp.com/todos?auth_token=mjwiPdGEPqnAV8MiFfLp',
                data: $scope.payload
            });

            $scope.showForm = false;
            //$scope.attendees.push($scope.attendee);
            $state.go('appmenu.today');
        };
    });

