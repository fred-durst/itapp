'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'TagsManager', function ($scope, Global, TagsManager) {

    $scope.global = Global;
    $scope.hashsearch = 'euromaidan';

    // Setup manager
    $scope.manager = TagsManager;

    // Interfaces
    $scope.googlePlusSearchInterface = new GooglePlusSearchInterface();

    $scope.manager.initialize();
    $scope.manager.registerSearchInterface($scope.googlePlusSearchInterface);

    $scope.manager.responseHandle = function(response) {

    	if (response.status != true) {
    		return false;
    	}

    	var mainContent	=	document.getElementById('main-content');

    	for (var i = 0; i < response.items.length; i++) {

	    	var container	=	document.createElement('div'),
	    		postData	=	document.createElement('div'),
	    		postContent	=	document.createElement('div'),
	    		postFooter	=	document.createElement('div');

	    	container.className		=	'post-container',
	    	postData.className		=	'post-data',
	    	postContent.className	=	'post-content',
	    	postFooter.className	=	'post-footer';

	    	container.appendChild(postData),
	    	container.appendChild(postContent),
	    	container.appendChild(postFooter);

	    	mainContent.appendChild(container);
	    }
    }

	$scope.search = function() {

		if ($scope.hashsearch.length == 0) {
			alert('Enter some tag to search');
			return false;
		}

    	$scope.manager.search($scope.hashsearch);
    	$scope.manager.getNext();
    }

    $scope.getMore = function(b) {
    	console.log(b);
    	$scope.manager.getNext();
    }
}]);