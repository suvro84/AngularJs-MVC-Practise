using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeProject.Portal.Models;
//using CodeProject.Business.Entities;
//using CodeProject.Business;
//using CodeProject.Interfaces;
//using Ninject;
using AngularJs_MVC_Routing.Models;
//using AngularJs_MVC_Routing.ApplicationService;
//using AngularJs_MVC_Routing.DataServiceInterface.Interfaces;
using System.Web.Http.Routing;
//using Ninject;
using AngularJs_MVC_Routing.DataServices;
using CodeProject.Business;
using CodeProject.Interfaces;
using CodeProject.Data.EntityFramework;
using CodeProject.Business.Entities;
using System.Web.Mvc;
//using AngularJSDataServiceInterface;

namespace AngularJs_MVC_Routing.WebApiControllers
{
    [RoutePrefix("api/CustomerService")]
    public class CustomerServiceController : ApiController
    {

        // [Inject]
        public ICustomerDataService _customerDataService { get; set; }
        public CustomerServiceController()
        {
            _customerDataService = new CustomerDataService();

        }

        /// <summary>
        /// Create Customer
        /// </summary>
        /// <param name="request"></param>
        /// <param name="customerViewModel"></param>
        /// <returns></returns>
        [Route("CreateCustomer")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage CreateCustomer(HttpRequestMessage request, [FromBody] CustomerViewModel customerViewModel)
        {
            TransactionalInformation transaction;

            Customer customer = new Customer();
            customer.CompanyName = customerViewModel.CompanyName;
            customer.ContactName = customerViewModel.ContactName;
            customer.ContactTitle = customerViewModel.ContactTitle;
            customer.CustomerCode = customerViewModel.CustomerCode;
            customer.Address = customerViewModel.Address;
            customer.City = customerViewModel.City;
            customer.Region = customerViewModel.Region;
            customer.PostalCode = customerViewModel.PostalCode;
            customer.Country = customerViewModel.Country;
            customer.PhoneNumber = customerViewModel.PhoneNumber;
            customer.MobileNumber = customerViewModel.MobileNumber;

            CustomersBusinessService customerBusinessService = new CustomersBusinessService(_customerDataService);
            customerBusinessService.CreateCustomer(customer, out transaction);
            if (transaction.ReturnStatus == false)
            {
                customerViewModel.ReturnStatus = false;
                customerViewModel.ReturnMessage = transaction.ReturnMessage;
                customerViewModel.ValidationErrors = transaction.ValidationErrors;

                var responseError = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.BadRequest, customerViewModel);
                return responseError;

            }

            customerViewModel.CustomerID = customer.CustomerID;
            customerViewModel.ReturnStatus = true;
            customerViewModel.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.OK, customerViewModel);
            return response;

        }
        [Route("DeleteCustomers")]
        [System.Web.Http.HttpPost]
        ////public HttpResponseMessage DeleteCustomers(string itemsSelected)//(HttpRequestMessage request, [FromBody] CustomerViewModel customerViewModel)//
        public HttpResponseMessage DeleteCustomers(HttpRequestMessage request, [FromBody] CustomerViewModel customerViewModel)//
        {
            string itemsSelected = "";
            try
            {

                if (customerViewModel == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Error null !");
                }
                else
                {
                    //for (int i = 0; i < itemsSelected.Length; i++)
                    //{
                    //    //var customer = context.Customers.Find(itemsSelected[i]);

                    //    //context.Customers.Remove(customer);

                    //}
                    TransactionalInformation transaction;
                    CustomersBusinessService customerBusinessService = new CustomersBusinessService(_customerDataService);
                    customerBusinessService.DeleteCustomers(customerViewModel.CustomerIds, out transaction);
                    if (transaction.ReturnStatus == false)
                    {
                        customerViewModel.ReturnStatus = false;
                        customerViewModel.ReturnMessage = transaction.ReturnMessage;
                        customerViewModel.ValidationErrors = transaction.ValidationErrors;

                        var responseError = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.BadRequest, customerViewModel);
                        return responseError;

                    }
                    // context.SaveChanges();
                    customerViewModel.ReturnStatus = true;
                    customerViewModel.ReturnMessage = transaction.ReturnMessage;
                    var response = GetCustomers(request, customerViewModel);
                    response = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.OK, customerViewModel);
                    return response;
                    // return Request.CreateResponse(HttpStatusCode.OK, "Success !");
                }

            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [Route("UpdateCustomer")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage UpdateCustomer(HttpRequestMessage request, [FromBody] CustomerViewModel customerViewModel)
        {
            TransactionalInformation transaction;

            Customer customer = new Customer();
            customer.CustomerID = customerViewModel.CustomerID;
            customer.CompanyName = customerViewModel.CompanyName;
            customer.ContactName = customerViewModel.ContactName;
            customer.ContactTitle = customerViewModel.ContactTitle;
            customer.CustomerCode = customerViewModel.CustomerCode;
            customer.Address = customerViewModel.Address;
            customer.City = customerViewModel.City;
            customer.Region = customerViewModel.Region;
            customer.PostalCode = customerViewModel.PostalCode;
            customer.Country = customerViewModel.Country;
            customer.PhoneNumber = customerViewModel.PhoneNumber;
            customer.MobileNumber = customerViewModel.MobileNumber;

            CustomersBusinessService customerBusinessService = new CustomersBusinessService(_customerDataService);
            customerBusinessService.UpdateCustomer(customer, out transaction);
            if (transaction.ReturnStatus == false)
            {
                customerViewModel.ReturnStatus = false;
                customerViewModel.ReturnMessage = transaction.ReturnMessage;
                customerViewModel.ValidationErrors = transaction.ValidationErrors;

                var responseError = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.BadRequest, customerViewModel);
                return responseError;

            }

            customerViewModel.ReturnStatus = true;
            customerViewModel.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.OK, customerViewModel);
            return response;

        }

        /// <summary>
        /// Get Customers
        /// </summary>
        /// <param name="request"></param>
        /// <param name="customerViewModel"></param>
        /// <returns></returns>
        [Route("GetCustomers")]

        //[Route("/api/CustomerService/GetCustomers")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage GetCustomers(HttpRequestMessage request, [FromBody] CustomerViewModel customerViewModel)
        {

            TransactionalInformation transaction;

            int currentPageNumber = customerViewModel.CurrentPageNumber;
            int pageSize = customerViewModel.PageSize;
            string sortExpression = customerViewModel.SortExpression;
            string sortDirection = customerViewModel.SortDirection;

            CustomersBusinessService customerBusinessService = new CustomersBusinessService(_customerDataService);
            List<Customer> customers = customerBusinessService.GetCustomers(currentPageNumber, pageSize, sortExpression, sortDirection, out transaction);
            if (transaction.ReturnStatus == false)
            {
                customerViewModel.ReturnStatus = false;
                customerViewModel.ReturnMessage = transaction.ReturnMessage;
                customerViewModel.ValidationErrors = transaction.ValidationErrors;

                var responseError = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.BadRequest, customerViewModel);
                return responseError;

            }

            customerViewModel.TotalPages = transaction.TotalPages;
            customerViewModel.TotalRows = transaction.TotalRows;
            customerViewModel.Customers = customers;
            customerViewModel.ReturnStatus = true;
            customerViewModel.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.OK, customerViewModel);
            return response;

        }
        //[Route("GetCustomers")]

        [Route("GetEmployees")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage GetEmployees(HttpRequestMessage request, [FromBody] Employee customerViewModel)
        {

            TransactionalInformation transaction;

            int currentPageNumber = customerViewModel.CurrentPageNumber;
            int pageSize = customerViewModel.PageSize;
            string sortExpression = customerViewModel.SortExpression;
            string sortDirection = customerViewModel.SortDirection;

            List<Employee> empList = new List<Employee>();

            Employee emp = new Employee { FirstName = "James", LastName = "Bond", Country = "Germany", Quantity = 1, UnitPrice=2 };
            empList.Add(emp);

            emp = new Employee { FirstName = "Roy", LastName = "Agasthyan", Country = "United States", Quantity = 5, UnitPrice = 4 };
            empList.Add(emp);

            customerViewModel.Employees = empList;
            customerViewModel.ReturnStatus = true;
            var response = Request.CreateResponse<Employee>(HttpStatusCode.OK, customerViewModel);

            return response;
        }
        /// <summary>
        /// Get Customer
        /// </summary>
        /// <param name="request"></param>
        /// <param name="customerViewModel"></param>
        /// <returns></returns>
        [Route("GetCustomer")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage GetCustomer(HttpRequestMessage request, [FromBody] CustomerViewModel customerViewModel)
        {

            TransactionalInformation transaction;

            int customerID = customerViewModel.CustomerID;

            CustomersBusinessService customerBusinessService = new CustomersBusinessService(_customerDataService);
            Customer customer = customerBusinessService.GetCustomer(customerID, out transaction);
            if (transaction.ReturnStatus == false)
            {
                customerViewModel.ReturnStatus = false;
                customerViewModel.ReturnMessage = transaction.ReturnMessage;
                customerViewModel.ValidationErrors = transaction.ValidationErrors;

                var responseError = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.BadRequest, customerViewModel);
                return responseError;

            }

            customerViewModel.CustomerID = customer.CustomerID;
            customerViewModel.CompanyName = customer.CompanyName;
            customerViewModel.ContactName = customer.ContactName;
            customerViewModel.ContactTitle = customer.ContactTitle;
            customerViewModel.CustomerCode = customer.CustomerCode;
            customerViewModel.Address = customer.Address;
            customerViewModel.City = customer.City;
            customerViewModel.Region = customer.Region;
            customerViewModel.PostalCode = customer.PostalCode;
            customerViewModel.Country = customer.Country;
            customerViewModel.PhoneNumber = customer.PhoneNumber;
            customerViewModel.MobileNumber = customer.MobileNumber;

            customerViewModel.ReturnStatus = true;
            customerViewModel.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<CustomerViewModel>(HttpStatusCode.OK, customerViewModel);
            return response;

        }

        /// <summary>
        /// Initialize Data
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        //[Route("InitializeData")]
        //[HttpPost]
        //public HttpResponseMessage InitializeData(HttpRequestMessage request)
        //{

        //    TransactionalInformation transaction;

        //    CustomersBusinessService CustomersBusinessService = new CustomersBusinessService(_customerDataService);
        //    CustomersBusinessService.InitializeData(out transaction);
        //    if (transaction.ReturnStatus == false)
        //    {               
        //        var responseError = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
        //        return responseError;

        //    }

        //    var response = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.OK, transaction);
        //    return response;

        //}
    }
}