app.controller('PostController', ['$scope', 'AuthFactory', 'PostsFactory',
	function($scope, AuthFactory, PostsFactory) {
		$scope.posts;
		postsFactory.resource.query().$promise.then(
            //success
            function(results) {
              // console.log(results);
              $scope.posts = results[0];
              console.log(results[0]);
            },
            //error
            function(err) {
              console.error(err);
            }
        );
		
		// check user rights
		AuthFactory.checkSession();
		$('.ui.modal').modal();
}]);