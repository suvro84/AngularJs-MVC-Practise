var app = angular.module('MyApp', ['ngRoute', 'blockUI', 'ui.bootstrap']);
app.config([
    '$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        $routeProvider
        .when('/', { // For Home Page
            templateUrl: '/AngularTemplates/Home.html',
            controller: 'HomeController'
        })
        .when('/Home/Contact', { // For Contact page
            templateUrl: '/AngularTemplates/Contact.html',
            controller: 'ContactController'
        })
        .when('/Home/About', { // For About page
            templateUrl: '/AngularTemplates/About.html',
            controller: 'AboutController'
        })
        .when('/Home/User/:userid', { // For User page 
            templateUrl: '/AngularTemplates/User.html',
            controller: 'UserController'
        })
             .when('/Customers/CustomerInquiry', { // For CustomerInquiry Page

                 //templateUrl: '/AngularTemplates/CustomerInquiry.html',
                 templateUrl: '',
                 controller: 'CustInq'
             })
            .when('/Customers/CustomerMaintenance/:customerID', { // For CustomerMaintenance Page

                //templateUrl: '/AngularTemplates/CustomerInquiry.html',
                templateUrl: '/Customers/CustomerMaintenance',
                controller: 'customerMaintenanceController as vm'
            })
            .when('/Customers/CustomerEntryDetails', { // For CustomerMaintenance Page

                //templateUrl: '/AngularTemplates/CustomerInquiry.html',
                // templateUrl: '/Customers/CustomerEntryDetails',
                templateUrl:'',
                controller: 'CustomerEntryDetails as vm'
            })
            //.when('/Customers/CustomerMaintenance/:customerID', {
            //    // templateUrl: '/AngularTemplates/CustomerInquiry.html',
            //    //templateUrl: '../Views/Customers/CustomerMaintenance.cshtml',
            //    controller: 'customerMaintenanceController as vm'
            //})

                .when('/Customers/CustomerInquiry1', { // For CustomerInquiry1 Page

                    templateUrl: '/AngularTemplates/CustomerInquiry1.html',
                    controller: 'customerInquiryController1'
                })
        .otherwise({   // This is when any route not matched => error
            controller: 'ErrorController'
        })
    }]);




