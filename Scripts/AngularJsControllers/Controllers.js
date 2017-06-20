//var app = angular.module('MyApp',[]);
var app = angular.module('MyApp');
//var app = angular.module('MyApp', ['ui.bootstrap']);

//var app = angular.module('MyApp', ['ajaxService', 'dataGridService', 'alertService']);

app.controller('UserController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.Message = "This is User  Page with query string id value = " + $routeParams.userid;
}]);

app.controller('HomeController', function ($scope) {
    $scope.Message = "This is HOME page";
})
app.controller('AboutController', function ($scope) {
    $scope.Message = "This is ABOUT page";
})

app.controller('UserController1', ['$scope', '$location', function ($scope, $location) {
    var paras = $location.search().userid;
    $scope.Message = "This is User information Page of user has id" + $location.path();
}])

app.controller('UserController2', ['$scope', '$routeParams', function ($scope, $routeParams) {
    // $routeParams used for get query string value
    var loc = window.location.href;
    var id = loc.slice(loc.lastIndexOf('/'), loc.length).split('/')[1];
    $scope.Message = "This is ORDER Page with query string id value =" + id + $routeParams.userid;;
}])


//app.controller('ContactController', function ($scope) {
//    // $routeParams used for get query string value
//    $scope.Message = "This is Contact Page  ";
//})



app.controller('ContactController', ["$scope", "ajaxService1", "ajaxService2", function ($scope, ajaxService1, ajaxService2) {
    //alert(ajaxService1);
    //alert(ajaxService2);
    var getData = ajaxService1.GetValue();
    alert(getData);
    var getData2 = ajaxService2.GetValue2();
    alert(getData2);
    $scope.Message = getData;
}]);

//app.service("ajaxService1", function () {
//    this.GetValue = function () {
//        return "ajaxService1";
//    };
   
//});

//app.service("ajaxService2", function () {
//    this.$get = function () {
//        return "ajaxService2";
//    };
//});
//app.controller('customerInquiryController1', function ($scope, $routeParams, $location,ajaxService,  dataGridService, alertService) {
//    // $routeParams used for get query string value
//    alert('hi');
//    $scope.Message = "This is customerInquiry1 Page  ";
//})

//app.controller('customerInquiryController1', ['$routeParams', '$location', 'ajaxService', 'dataGridService', 'alertService',
//    function ($routeParams, $location, ajaxService, dataGridService, alertService) {
//        // $routeParams used for get query string value
//        alert('hi');
//        $scope.Message = "This is customerInquiry1 Page  ";
//    }]);
app.controller('ErrorController', function ($scope) {
    $scope.Message = "404 Not Found!";
});
//app.controller('customerInquiryController', function ($scope, $routeParams, $location, ajaxService, dataGridService, alertService) {
//    alert('hi');
//    $scope.Message = "This is customerInquiry page";

//})

//console.log("customer inquiry");

//app.controller('customerInquiryController', ['$routeParams', '$location', 'ajaxService', 'dataGridService', 'alertService',
//    function ($routeParams, $location, ajaxService, dataGridService, alertService) {
//       // alert('hi');
//        "use strict";

//        var vm = this;

//        this.initializeController = function () {

//            vm.title = "Customer Inquiry";

//            vm.alerts = [];
//            vm.closeAlert = alertService.closeAlert;

//            dataGridService.initializeTableHeaders();

//            dataGridService.addHeader("Customer Code", "CustomerCode");
//            dataGridService.addHeader("Company Name", "CompanyName");
//            dataGridService.addHeader("Contact Name", "ContactName");
//            dataGridService.addHeader("City", "City");
//            dataGridService.addHeader("Region", "Region");

//            vm.tableHeaders = dataGridService.setTableHeaders();
//            vm.defaultSort = dataGridService.setDefaultSort("Company Name");

//            vm.currentPageNumber = 1;
//            vm.sortExpression = "CompanyName";
//            vm.sortDirection = "ASC";
//            vm.pageSize = 15;

//            this.executeInquiry();

//        }

//        this.closeAlert = function (index) {
//            vm.alerts.splice(index, 1);
//        };

//        this.changeSorting = function (column) {

//            dataGridService.changeSorting(column, vm.defaultSort, vm.tableHeaders);

//            vm.defaultSort = dataGridService.getSort();
//            vm.sortDirection = dataGridService.getSortDirection();
//            vm.sortExpression = dataGridService.getSortExpression();
//            vm.currentPageNumber = 1;

//            vm.executeInquiry();

//        };

//        this.setSortIndicator = function (column) {
//            return dataGridService.setSortIndicator(column, vm.defaultSort);
//        };

//        this.pageChanged = function () {
//            this.executeInquiry();
//        }

//        this.executeInquiry = function () {
//            alert('executeInquiry');
//            var inquiry = vm.prepareSearch();
//            ajaxService.ajaxPost(inquiry, "api/CustomerService/GetCustomers", this.getCustomersOnSuccess, this.getCustomersOnError);
//        }

//        this.prepareSearch = function () {

//            var inquiry = new Object();

//            inquiry.currentPageNumber = vm.currentPageNumber;
//            inquiry.sortExpression = vm.sortExpression;
//            inquiry.sortDirection = vm.sortDirection;
//            inquiry.pageSize = vm.pageSize;

//            return inquiry;

//        }

//        this.getCustomersOnSuccess = function (response) {
//            vm.customers = response.customers;
//            vm.totalCustomers = response.totalRows;
//            vm.totalPages = response.totalPages;
//        }

//        this.getCustomersOnError = function (response) {
//            alertService.RenderErrorMessage(response.ReturnMessage);
//        }


//    }]);
