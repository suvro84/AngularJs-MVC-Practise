
//console.log("customer inquiry");

//angular.module("MyApp").register.controller('customerInquiryController', ['$routeParams', '$location', 'ajaxService', 'dataGridService', 'alertService',

app.controller('CustInq', ['$routeParams', '$modal', '$location', 'ajaxService', 'dataGridService', 'alertService', 'blockUI', '$scope', '$rootScope',

    function ($routeParams, $modal, $location, ajaxService, dataGridService, alertService, blockUI, $scope, $rootScope) {
        debugger;
        // alert('hi');
        "use strict";

        var vm = this;

        //console.log($scope.$parent.thiscompanyNameToEdit);


        this.initializeController = function () {
            // alert('init');
            // debugger;
            vm.title = "Customer Inquiry";

            vm.alerts = [];
            vm.closeAlert = alertService.closeAlert;

            dataGridService.initializeTableHeaders();
            //dataGridService.addHeader("Select", "Select");
            // dataGridService.addHeader("Customer Code", "CustomerCode");
            dataGridService.addHeader("Customer Code", "CustomerCode");
            dataGridService.addHeader("Company Name", "CompanyName");
            dataGridService.addHeader("Contact Name", "ContactName");
            dataGridService.addHeader("City", "City");
            dataGridService.addHeader("Region", "Region");

            vm.tableHeaders = dataGridService.setTableHeaders();
            vm.defaultSort = dataGridService.setDefaultSort("Company Name");

            vm.currentPageNumber = 1;
            vm.sortExpression = "CompanyName";
            vm.sortDirection = "ASC";
            vm.pageSize = 5;
            //debugger;
            this.executeInquiry();

        }

        this.checkAll = function () {
           // alert('checkall');
            debugger;
            var itemList = [];
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach(vm.customers, function (item) {
                debugger;
                item.selected = $scope.selectedAll;
                //if ($scope.selectedAll) {
                //    itemList.push(item.customerCode);
                //}
                //else {
                //    itemList.push("");
                //}
            });
            //alert(itemList);
        };
        this.RemoveHeaderCB = function (CurrentCheckboxValue) {
            debugger;
            //alert(CurrentCheckboxValue);
            if (!CurrentCheckboxValue) {
                $scope.selectedAll = false;
            }

        };
        this.DeleteCustomer = function (list) {
            //alert(list);
            var itemList = [];
            angular.forEach(list, function (value, key) {
                //debugger;
                if (list[key].selected) {
                    itemList.push(list[key].selected);
                }
            });
            alert(itemList);
            //debugger;
            var customer = new Object();
            //customer = vm.customers;
            //customer.customerID = vm.customerID
            //customer.customerCode = vm.customerCode;
            //customer.companyName = vm.companyName;
            //customer.contactName = vm.contactName;
            //customer.contactTitle = vm.contactTitle;
            //customer.address = vm.address;
            //customer.city = vm.city;
            //customer.region = vm.region;
            //customer.postalCode = vm.postalCode;
            //customer.country = vm.country;
            //customer.phoneNumber = vm.phoneNumber;
            //customer.mobileNumber = vm.mobileNumber;
            //alert(customer.customerID);
            customer.CustomerIds = itemList;

            //var inquiry = vm.prepareSearch();
            ajaxService.ajaxPost(customer, "http://localhost:2668/api/CustomerService/DeleteCustomers", this.getCustomersOnSuccess, this.getCustomersOnError);

            //console.log(itemList.length);  
            //$http.post("http://localhost:2668/api/Customer/DeleteCustomers", itemList).success(function (data) {
            //    $window.alert(data);
            //}).error(function (msg) {
            //    console.log(msg);
            //});
        }



        //this.openModal = function () {

        //    var modalInstance = $modal.open({
        //        templateUrl: 'myModalContent.html',
        //        controller: ModalInstanceCtrl,
        //        windowClass: 'app-modal-window'
        //    });

        //    modalInstance.result.then(function (customerID) {
        //        //var getProduct = new Object();
        //        //getProduct.ProductID = productID;
        //        //productService.getProduct(getProduct, $scope.getProductCompleted, $scope.getProductError);
        //        var customer = new Object();
        //        customer.customerID = customerID;
        //        ajaxService.ajaxPost(customer, "http://localhost:2668/api/CustomerService/GetCustomer", this.getCustomerOnSuccess, this.getCustomerOnError);

        //    }, function () {
        //        //$log.info('Modal dismissed at: ' + new Date());
        //    });
        //};
        //var ModalInstanceCtrl = function ($scope, $modalInstance) {

        //    $scope.ProductCode = "";
        //    $scope.ProductDescription = "";

        //    $scope.ok = function (productID) {
        //        $modalInstance.close(productID);
        //    };

        //    $scope.cancel = function () {
        //        $modalInstance.dismiss('cancel');
        //    };


        //};



        //this.EditLineItem = function (i) {
        //    //alert(i);
        //    // debugger;
        //    $scope.customerID = vm.customers[i].customerID;
        //    $scope.companyName = vm.customers[i].companyName;
        //    $scope.contactName = vm.customers[i].contactName;
        //    //$scope.orderDetailIDToDelete = $scope.OrderDetails[i].OrderDetailID;
        //    $scope.indexToDelete = i;

        //    $scope.openEditLineItemModal(i);

        //}
        //$scope.openEditLineItemModal = function (indexToEdit) {
        //    //alert(indexToEdit);
        //    var modalInstance = $modal.open({
        //        templateUrl: 'EditLineItemModal.html',
        //        controller: EditLineItemController,
        //        windowClass: 'app-modal-window'
        //        , resolve: {
        //            indexToEdit: function () {
        //                return indexToEdit;
        //            },
        //            companyNameToEdit: function () {
        //                return $scope.companyName;
        //            },
        //            contactNameToEdit: function () {
        //                return $scope.contactName;
        //            }


        //        }
        //    });


        //};
        //var EditLineItemController = function ($scope, $modalInstance, indexToEdit, companyNameToEdit, contactNameToEdit
        //   ) {
        //    debugger;

        //    //console.log($scope.thiscompanyNameToEdit);
        //    alert($scope.$parent.thiscompanyNameToEdit);
        //    //alert(indexToEdit);
        //    $scope.companyNameToEdit = companyNameToEdit;
        //    alert($scope.companyNameToEdit);
        //    $scope.contactNameToEdit = contactNameToEdit;
        //    $scope.customerID = vm.customers[indexToEdit].customerID;

        //    $scope.okToEdit = function () {
        //        alert('edit');
        //        debugger;

        //        //  $scope.customers[indexToEdit].DisplayMode = true;
        //        //  $scope.customers[indexToEdit].EditMode = true;
        //        alert($scope.companyNameToEdit);

        //        var customer = new Object();
        //        customer.customerID = vm.customerID
        //        customer.customerCode = vm.customerCode;
        //        customer.companyName = vm.companyName;
        //        customer.contactName = vm.contactName;
        //        customer.contactTitle = vm.contactTitle;
        //        customer.address = vm.address;
        //        customer.city = vm.city;
        //        customer.region = vm.region;
        //        customer.postalCode = vm.postalCode;
        //        customer.country = vm.country;
        //        customer.phoneNumber = vm.phoneNumber;
        //        customer.mobileNumber = vm.mobileNumber;



        //        //alert(companyNameToEdit);
        //        //var customer = new Object();
        //        //customer.customerID = $scope.customerID
        //        //customer.companyName = $scope.thiscompanyNameToEdit;
        //        //customer.contactName = $scope.contactNameToEdit;                
        //        vm.executeInquiry();
        //        $modalInstance.close(customer);
        //    };

        //    $scope.cancelEdit = function () {
        //        $modalInstance.dismiss('cancel');
        //    };

        //};

        this.EditLineItem = function (customer) {
            var modalInstance = $modal.open({
                //templateUrl: "/Customers/EditLineItemModal",
                templateUrl: 'EditLineItemModal.html',
                controller: EditLineItemController,
                windowClass: 'app-modal-window',
                resolve: {
                    toEditCoustomer: function () {
                        return customer;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                debugger;
                angular.forEach($scope.vm.customers, function (data) {
                    if (data.customerID == result.customerID) {
                        angular.copy(result, data);
                        //you also could do save to your DB at here.
                        return true;
                    }
                });
            }, function (reason) {

            });
        }
        var EditLineItemController = function ($scope, $modalInstance, toEditCoustomer) {
            $scope.customer = angular.copy(toEditCoustomer);
            $scope.saveEdit = function () {
                debugger;
                ajaxService.ajaxPost($scope.customer, "http://localhost:2668/api/CustomerService/UpdateCustomer", vm.updateCustomerOnSuccess, vm.updateCustomerOnError);
                debugger;

                $modalInstance.close($scope.customer);
            }
            $scope.cancelEdit = function () {
                $modalInstance.dismiss('cancel');
            };
        }

        this.updateCustomerOnSuccess = function (response) {
            //  alert(response);
            debugger;
            // vm.clearValidationErrors();
            alertService.renderSuccessMessage(response.returnMessage);
            alert(alertService.returnFormattedMessage());
            vm.messageBox = alertService.returnFormattedMessage();
            vm.alerts = alertService.returnAlerts();
        }
        this.updateCustomerOnError = function (response) {
            alert(response);
            vm.clearValidationErrors();
            alertService.renderErrorMessage(response.returnMessage);
            alert(response.returnMessage);
            vm.messageBox = alertService.returnFormattedMessage();
            vm.alerts = alertService.returnAlerts();
            alertService.setValidationErrors(vm, response.validationErrors);
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
        this.openModal = function () {

            var modalInstance = $modal.open({
                templateUrl: 'CustomerEdit.html',
                controller: ModalInstanceCtrl,
                windowClass: 'app-modal-window'
            });

            modalInstance.result.then(function (customerID) {
                //var getProduct = new Object();
                //getProduct.ProductID = productID;
                //productService.getProduct(getProduct, $scope.getProductCompleted, $scope.getProductError);
                var customer = new Object();
                customer.customerID = customerID;
                ajaxService.ajaxPost(customer, "http://localhost:2668/api/CustomerService/GetCustomer", this.getCustomerOnSuccess, this.getCustomerOnError);

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };
        var ModalInstanceCtrl = function ($scope, $modalInstance) {

            $scope.ProductCode = "";
            $scope.ProductDescription = "";

            $scope.ok = function (productID) {
                $modalInstance.close(productID);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };


        };
        this.funGetData = function (cutomerId) {
            $rootScope.cid = cutomerId;
            alert('Hiii' + cutomerId);
            window.location = '../Customers/CustomerMaintenance/' + cutomerId;
            //vm.customerID = cutomerId;
            //var customer = new Object();
            //customer.customerID = cutomerId

            //ajaxService.ajaxPost(customer, "../api/CustomerService/GetCustomer", this.getCustomerOnSuccess, this.getCustomerOnError);
            // location.reload();
        }

        this.pageChanged = function () {
            debugger;
            this.executeInquiry();
        }

        this.executeInquiry = function () {
            // alert('hi');
            var inquiry = vm.prepareSearch();
            debugger;
            ajaxService.ajaxPost(inquiry, "http://localhost:2668/api/CustomerService/GetCustomers", this.getCustomersOnSuccess, this.getCustomersOnError);


            //$http.post("api/Customer/DeleteCustomers", itemList).success(function (data) {
            //    $window.alert(data);
            //}).error(function (msg) {
            //    console.log(msg);
            //});
            // ajaxService.ajaxPost(inquiry, "../CustomerService/GetCustomers", this.getCustomersOnSuccess, this.getCustomersOnError);

            //ajaxService.ajaxPost(inquiry, "api/CustomerService/GetCustomers", this.getCustomersOnSuccess, this.getCustomersOnError);

            //ajaxService.ajaxPost(inquiry, "api/GetCustomers", this.getCustomersOnSuccess, this.getCustomersOnError);

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
            vm.customers = response.customers;
            vm.totalCustomers = response.totalRows;
            vm.totalPages = response.totalPages;
        }

        this.getCustomersOnError = function (response) {
            debugger;
            alertService.RenderErrorMessage(response.ReturnMessage);
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

//console.log("ajax service");

//app.service('ajaxService', ['$http', function ($http) {

//    "use strict";

//    this.ajaxPost = function (data, route, successFunction, errorFunction) {
//        debugger;
//          //blockUI.start();

//        $http.post(route, data).success(function (response, status, headers, config) {
//            //  blockUI.stop();
//            successFunction(response, status);
//        }).error(function (response) {
//            // blockUI.stop();
//            errorFunction(response);
//        });

//    }

//}]);
////alert("data grid service")
//console.log("data grid service");

//app.service('dataGridService', [function () {
//    debugger;
//    var dataGrid = new Object();

//    dataGrid.tableHeaders = [];
//    dataGrid.sortExpression = "";
//    dataGrid.sortDirection = "";
//    dataGrid.sort = "";

//    this.initializeTableHeaders = function () {
//        dataGrid = new Object();
//        dataGrid.tableHeaders = [];
//    };

//    this.addHeader = function (label, expression) {
//        var tableHeader = new Object();
//        tableHeader.label = label;
//        tableHeader.sortExpression = expression;
//        dataGrid.tableHeaders.push(tableHeader);
//    };

//    this.setTableHeaders = function () {
//        return dataGrid.tableHeaders;
//    }

//    this.changeSorting = function (columnSelected, currentSort, tableHeaders) {

//        dataGrid = new Object();

//        dataGrid.sortExpression = "";

//        var sort = currentSort;
//        if (sort.column == columnSelected) {
//            sort.descending = !sort.descending;
//        } else {
//            sort.column = columnSelected;
//            sort.descending = false;
//        }

//        for (var i = 0; i < tableHeaders.length; i++) {
//            if (sort.column == tableHeaders[i].label) {
//                dataGrid.sortExpression = tableHeaders[i].sortExpression;
//                break;
//            }
//        }

//        if (sort.descending == true)
//            dataGrid.sortDirection = "DESC";
//        else
//            dataGrid.sortDirection = "ASC";

//        dataGrid.sort = sort;

//    }

//    this.getSort = function (columnSelected, currentSort, tableHeaders) {
//        return dataGrid.sort;
//    };

//    this.getSortDirection = function () {
//        return dataGrid.sortDirection;
//    };

//    this.getSortExpression = function () {
//        return dataGrid.sortExpression;
//    };

//    this.setDefaultSort = function (defaultSort) {
//        var sort = {
//            column: defaultSort,
//            descending: false
//        }
//        return sort;
//    };

//    this.setSortIndicator = function (column, defaultSort) {
//        return column == defaultSort.column && 'sort-' + defaultSort.descending;
//    };

//}]);

////alert("alert service");

//console.log("alert service");

//app.service('alertService', ['$rootScope', function ($rootScope) {
//    //debugger;
//    $rootScope.alerts = [];
//    $rootScope.messageBox = "";

//    var _alerts = [];
//    var _messageBox = "";

//    this.setValidationErrors = function (scope, validationErrors) {

//        for (var prop in validationErrors) {
//            var property = prop + "InputError";
//            scope[property] = true;
//        }

//    }

//    this.returnFormattedMessage = function () {
//        return _messageBox;
//    }

//    this.returnAlerts = function () {
//        return _alerts;
//    }

//    this.renderErrorMessage = function (message) {

//        var messageBox = formatMessage(message);

//        _alerts = [];
//        _messageBox = messageBox;
//        _alerts.push({ 'type': 'danger', 'msg': '' });

//    };

//    this.renderSuccessMessage = function (message) {

//        var messageBox = formatMessage(message);

//        _alerts = [];
//        _messageBox = messageBox;
//        _alerts.push({ 'type': 'success', 'msg': '' });

//    };

//    this.renderWarningMessage = function (message) {

//        var messageBox = formatMessage(message);

//        _alerts = [];
//        _messageBox = messageBox;
//        _alerts.push({ 'type': 'warning', 'msg': '' });

//    };

//    this.renderInformationalMessage = function (message) {

//        var messageBox = formatMessage(message);

//        _alerts = [];
//        _messageBox = messageBox;
//        _alerts.push({ 'type': 'info', 'msg': '' });

//    };

//    function formatMessage(message) {
//        var messageBox = "";
//        if (angular.isArray(message) == true) {
//            for (var i = 0; i < message.length; i++) {
//                messageBox = messageBox + message[i] + "<br/>";
//            }
//        }
//        else {
//            messageBox = message;
//        }

//        return messageBox;

//    }


//}]);
