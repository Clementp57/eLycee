app.controller('SidebarCtrl', ['$scope', '$http', 'CONFIG', 'tweetsWidgetService', function($scope, $http, CONFIG,tweetsWidgetService) {
    $('.left.sidebar').first()
        .sidebar('attach events', '#sidebar-button')
    ;
    $('.ui.dropdown').dropdown();
    $scope.search = function() {
        var searchQuery = $('#searchField').val();
        $http.get(CONFIG.apiUrl+'search/'+searchQuery).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(data);

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

    tweetsWidgetService.destroyAllWidgets();
    tweetsWidgetService.loadAllWidgets();
}]);