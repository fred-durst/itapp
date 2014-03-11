'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Statistics',
        'link': 'stats'
    }, {
        'title': 'Blas title',
        'link': 'blalink'
    }];
    
    $scope.isCollapsed = false;
}]);