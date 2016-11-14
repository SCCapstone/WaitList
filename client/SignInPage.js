var app = angular.module('login', []);
app.controller('myCtrl', function($scope) {
    $scope.showLogin = false;
    $scope.loginFunc = function() {
        $scope.showLogin = !$scope.showLogin;
    }
});
