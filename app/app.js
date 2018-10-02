var myApp = angular.module('myApp', ['ngRoute','ngAnimate']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){

    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    //   });

    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller : 'myController'
    })
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactController'
    })
    .when('/contact-success', {
        templateUrl: 'views/contact-success.html',
        controller: 'contactController'
    })
    .when('/directory', {
        templateUrl : 'views/directory.html',
        controller : 'myController'

    }).otherwise({
        redirectTo: '/home'
    })

}]);

// myApp.run(function(){

// });

myApp.directive('randomArray', [function(){

    return{
        restict : 'E',
        scope : {
            array : '=',
            title : "="
        }, 
        transclude: true,
        replace : true,
        templateUrl: 'views/random.html',
        controller: function($scope){
            $scope.random = Math.floor(Math.random() *4 );
        }
    };


}]);

 myApp.controller('myController', ['$scope', '$http', function($scope, $http){
    $scope.removeArr = function(arr){
        var removedArr = $scope.array.indexOf(arr);

        $scope.array.splice(removedArr,1);
    }

    $scope.addNew = function(){
        $scope.array.push({
            name : $scope.newUser.name,
            belt : $scope.newUser.belt,
            rate : parseInt($scope.newUser.rate),
            img : $scope.newUser.img,
            available: true
        });
        $scope.newUser.name = "";
        $scope.newUser.belt = "";
        $scope.newUser.rate = "";

        console.log($scope.array);
        
    };

    $scope.removeAll = function(){
        $scope.array =[];
    }

    $http.get('data/arrays.json').then(function (response) {
        $scope.array = response.data;
     });

   

 }]);

 myApp.controller('contactController', ['$scope' , '$location' , function($scope,$location){

        $scope.sendMessage = function(){
            $location.path('/contact-success');
        }
 }])