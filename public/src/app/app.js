// __  Angular
var app;
app = angular.module('eLycee', ["ngRoute","ngResource","ngMap"]);

app.controller('NavController', ['$scope', '$location', function($scope, $location) {
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
}]);

app.controller('HomeController', ['$http', '$location', '$scope', function($http, $location, $scope) {
  $http.get('api/v1/posts').
  success(function(data, status, headers, config) {
    $scope.allPosts = data;
    console.log(data);
  }).
  error(function(data, status, headers, config) {
    console.info('error => '+ status);
    console.log(config);
  });
}]);


app.controller('NewsController', ['$http', '$location', '$scope', function($http, $location, $scope) {
  $http.get('api/v1/posts').
    success(function(data, status, headers, config) {
      $scope.allPosts = data;
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.info('error => '+ status);
      console.log(config);
    });
}]);

app.controller('ContactController', ['$scope', function($scope) {
  $scope.$on('mapInitialized', function(event, map) {
    console.log('ready');
    });
}]);



// ************* JEREMIE => Authenticate user url laravel = api/v1/auth/login api/v1/auth/logout
app.factory('auth', function($http, $q, $window) {
  var userInfos;
 
  function login(userName, password) {
    var deferred = $q.defer();
 
    $http.post('/api/login', {
      userName: userName,
      password: password
    }).then(function(result) {
      userInfo = {
        accessToken: result.data.access_token,
        userName: result.data.userName
      };
      $window.sessionStorage['userInfos'] = JSON.stringify(userInfo);
      deferred.resolve(userInfo);
    }, function(error) {
      deferred.reject(error);
    });
 
    return deferred.promise;
  }
 
  return {
    login: login
  };
});

app.controller('ConnexionController', ['$scope', 'auth', function($scope, auth) {

  $scope.userConnexion = function() {
    console.log('connext');
  };

  $scope.$watch('user', function (u) {
      console.log(u);
  });
}]);




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
    }).otherwise({
      redirectTo: '/'
    });
  }]);

// AJAX REQUEST INTERCEPTOR (used to display ajax loading spinner ;) )
// //httpInterceptor creation with factory
// app.factory('ajaxSpinnerInterceptor', function ($q, $window) {
//   return function (promise) {
//     return promise.then(function (response) {
//       $("#spinner").hide();
//       console.log('stop');
//       return response;
//     }, function (response) {
//       $("#spinner").hide();
//       console.log('stop');
//       return $q.reject(response);
//     });
//   };
// });

// //registering it into httpProvider service
// app.config(["$httpProvider", function ($httpProvider) {
//   $httpProvider.interceptors.push('ajaxSpinnerInterceptor');

//   var spinnerFunction = function spinnerFunction(data, headersGetter) {
//     $("#spinner").show();
//     console.log('start');
//     return data;
//   };

//   $httpProvider.defaults.transformRequest.push(spinnerFunction);
// }]);


// // __init header sticky
// function init() {
//     window.addEventListener('scroll', function(e){
//         var distanceY = window.pageYOffset || document.documentElement.scrollTop,
//             shrinkOn = 100,
//             header = document.querySelector("header");
//         if (distanceY > shrinkOn) {
//             classie.add(header,"smaller");
//         } else {
//             if (classie.has(header,"smaller")) {
//                 classie.remove(header,"smaller");
//             }
//         }
//     });
// }
// window.onload = init();


