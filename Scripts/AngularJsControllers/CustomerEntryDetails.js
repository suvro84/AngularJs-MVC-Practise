
console.log("customerEntryDetails");

//angular.module("MyApp").register.controller('customerInquiryController', ['$routeParams', '$location', 'ajaxService', 'dataGridService', 'alertService',

app.controller('CustomerEntryDetails', ['$routeParams', '$modal', '$location', 'ajaxService', 'dataGridService', 'alertService', 'blockUI', '$scope', '$rootScope',

    function ($routeParams, $modal, $location, ajaxService, dataGridService, alertService, blockUI, $scope, $rootScope) {
        //debugger;
        // alert('hi');
        "use strict";

        var vm = this;




        this.initializeController = function () {
            alert('CustomerEntryDetails');
            //debugger;
            vm.title = "Customer Entry Details";

            vm.alerts = [];
            vm.closeAlert = alertService.closeAlert;

            //dataGridService.initializeTableHeaders();
            //dataGridService.addHeader("Select", "Select");
            //dataGridService.addHeader("Customer Code", "CustomerCode");
            //dataGridService.addHeader("Company Name", "CompanyName");
            //dataGridService.addHeader("Contact Name", "ContactName");
            //dataGridService.addHeader("City", "City");
            //dataGridService.addHeader("Region", "Region");

            //vm.tableHeaders = dataGridService.setTableHeaders();
            //vm.defaultSort = dataGridService.setDefaultSort("Company Name");

            //vm.currentPageNumber = 1;
            //vm.sortExpression = "CompanyName";
            //vm.sortDirection = "ASC";
            //vm.pageSize = 5;
            //debugger;
            this.executeInquiry();

        }

        this.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };
        this.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };

        this.changeSorting = function (column) {

            dataGridService.changeSorting(column, vm.defaultSort, vm.tableHeaders);

            vm.defaultSort = dataGridService.getSort();
            vm.sortDirection = dataGridService.getSortDirection();
            vm.sortExpression = dataGridService.getSortExpression();
            vm.currentPageNumber = 1;

            vm.executeInquiry();

        };

        this.setSortIndicator = function (column) {
            return dataGridService.setSortIndicator(column, vm.defaultSort);
        };



        this.pageChanged = function () {
            debugger;
            this.executeInquiry();
        }

        this.executeInquiry = function () {
            // alert('hi');
            var inquiry = vm.prepareSearch();
            debugger;
            ajaxService.ajaxPost(inquiry, "http://localhost:2668/api/CustomerService/GetEmployees", this.getCustomersOnSuccess, this.getCustomersOnError);




        }

        this.prepareSearch = function () {
            // debugger;
            var inquiry = new Object();

            inquiry.currentPageNumber = vm.currentPageNumber;
            inquiry.sortExpression = vm.sortExpression;
            inquiry.sortDirection = vm.sortDirection;
            inquiry.pageSize = vm.pageSize;

            return inquiry;

        }

        this.getCustomersOnSuccess = function (response) {
            //  alert('hi');
            debugger;
            vm.employees = response.employees;
            angular.forEach(response.employees, function (obj) {
                obj["showEdit"] = true;
            })
            //obj["showEdit"] = true;
            //vm.totalCustomers = response.totalRows;
            //vm.totalPages = response.totalPages;
        }

        this.getCustomersOnError = function (response) {
            debugger;
            alertService.RenderErrorMessage(response.ReturnMessage);
        }

        this.toggleEdit = function (emp) {
            emp.showEdit = emp.showEdit ? false : true;
        }
        this.go_to_item = function (cutomerId) {
            debuuger;
            alert('hi');
            /*
            debugger;
            window.location = '../Customers/CustomerMaintenance/{"/' + cutomerId + '"}';
            location.reload();
            */
        };




    }]);


