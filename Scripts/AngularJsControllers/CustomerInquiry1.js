//var app = angular.module('MyApp', []);
var app = angular.module('MyApp');
debugger;
//var app = angular.module('MyApp', ['ajaxService', 'dataGridService', 'alertService']);

//app.controller('customerInquiryController1', [ '$routeParams', '$location', 'ajaxService', 'dataGridService', 'alertService',
////angular.module("MyApp").register.controller('customerInquiryController', ['$routeParams', '$location', 'ajaxService', 'dataGridService', 'alertService',
//app.register.controller('customerInquiryController1', ['$routeParams', '$location', 'ajaxService', 'dataGridService', 'alertService',

//    function ($routeParams, $location, ajaxService, dataGridService, alertService) {
//        // $routeParams used for get query string value
//        alert('hi');
//        $scope.Message = "This is customerInquiry1 Page  ";
//    }]);



app.controller('customerInquiryController1', ["$scope", "ajaxService1", function ($scope, ajaxService1) {
    $scope.Message = ajaxService1;
}]);