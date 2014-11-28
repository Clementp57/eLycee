// __  Angular
var app;
app = angular.module('eLycee', ["ngRoute","ngResource","ngMap","angular-growl","ngAnimate", "ngSanitize"]);

// ROUTING ANGULAR
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'HomeController',
      templateUrl: 'src/app/views/home.html'
    }).when('/news', {
      controller: 'NewsController',
      templateUrl: 'src/app/views/news.html'
    }).when('/contact', {
      controller: 'ContactController',
      templateUrl: 'src/app/views/contact.html'
    }).when('/admin', {
        controller : 'AdminController',
        templateUrl : 'src/app/admin/views/admin.html'
    }).otherwise({
      redirectTo: '/'
    });
  }]);


// __ Config des notifications
app.config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive({
    success: 1000, 
    error: 2000, 
    warning: 3000, 
    info: 4000
  });
}]);


