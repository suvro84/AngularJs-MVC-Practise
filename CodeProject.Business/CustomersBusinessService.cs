using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.IO;
using CodeProject.Business.Entities;
//using CodeProject.Data.EntityFramework;
//using CodeProject.Business.Entities;
using CodeProject.Interfaces;
using FluentValidation.Results;
using CodeProject.Business.Common;
//using AngularJSDataModels;
//using AngularJSUtilities;
//using AngularJs_MVC_Routing.Models;

namespace CodeProject.Business
{
    public class CustomersBusinessService
    {

        ICustomerDataService _customersDataService;

        private ICustomerDataService customersDataService
        {
            get { return _customersDataService; }
        }
        public CustomersBusinessService()
        {

        }
        /// <summary>
        /// Constructor
        /// </summary>
        public CustomersBusinessService(ICustomerDataService dataService)
        {
            _customersDataService = dataService;
        }
      
        /// <summary>
        /// customer Inquiry
        /// </summary>
        /// <param name="customerCode"></param>
        /// <param name="companyName"></param>
        /// <param name="paging"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        //public List<Customer> CustomerInquiry(string customerCode, string companyName, DataGridPagingInformation paging, out TransactionalInformation transaction)
        //{
        //    transaction = new TransactionalInformation();

        //    List<Customer> customers = new List<Customer>();

        //    try
        //    {
        //        customersDataService.CreateSession();
        //        customers = customersDataService.CustomerInquiry(customerCode, companyName, paging, out transaction);
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction.ReturnMessage = new List<string>();
        //        string errorMessage = ex.Message;
        //        transaction.ReturnStatus = false;
        //        transaction.ReturnMessage.Add(errorMessage);
        //    }
        //    finally
        //    {
        //        customersDataService.CloseSession();
        //    }

        //    return customers;

        //}

        /// <summary>
        /// Get Customers
        /// </summary>
        /// <param name="currentPageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortExpression"></param>
        /// <param name="sortDirection"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public List<Customer> GetCustomers(int currentPageNumber, int pageSize, string sortExpression, string sortDirection, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            List<Customer> customers = new List<Customer>();

            try
            {
                int totalRows;

                customersDataService.CreateSession();
                customers = customersDataService.GetCustomers(currentPageNumber, pageSize, sortExpression, sortDirection, out totalRows);
                customersDataService.CloseSession();

                transaction.TotalPages = CodeProject.Business.Common.Utilities.CalculateTotalPages(totalRows, pageSize);
                transaction.TotalRows = totalRows;

                transaction.ReturnStatus = true;

            }
            catch (Exception ex)
            {
                string errorMessage = ex.Message;
                transaction.ReturnMessage.Add(errorMessage);
                transaction.ReturnStatus = false;
            }
            finally
            {
                customersDataService.CloseSession();
            }

            return customers;

        }
        /// <summary>
        /// Get Customer
        /// </summary>
        /// <param name="customerID"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public Customer GetCustomer(int customerID, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            Customer customer = new Customer();

            try
            {
                customersDataService.CreateSession();
                customer = customersDataService.GetCustomer(customerID);
                transaction.ReturnStatus = true;
            }
            catch (Exception ex)
            {
                transaction.ReturnMessage = new List<string>();
                string errorMessage = ex.Message;
                transaction.ReturnStatus = false;
                transaction.ReturnMessage.Add(errorMessage);
            }
            finally
            {
                customersDataService.CloseSession();
            }

            return customer;

        }


        /// <summary>
        /// Create Customer
        /// </summary>
        /// <param name="customerCode"></param>
        /// <param name="companyName"></param>
        /// <param name="address"></param>
        /// <param name="city"></param>
        /// <param name="region"></param>
        /// <param name="postalCode"></param>
        /// <param name="country"></param>
        /// <param name="phoneNumber"></param>
        /// <param name="webSiteUrl"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        //public Customer CreateCustomer(string customerCode, string companyName, string address, string city, string region, string postalCode, string country, string phoneNumber, string webSiteUrl, out TransactionalInformation transaction)
        //{

        //    transaction = new TransactionalInformation();

        //    CustomerBusinessRules customersBusinessRules = new CustomerBusinessRules();

        //    Customer customer = new Customer();

        //    customer.CustomerCode = customerCode;
        //    customer.CompanyName = companyName;
        //    customer.Address = address;
        //    customer.City = city;
        //    customer.Region = region;
        //    customer.PostalCode = postalCode;
        //    customer.Country = country;
        //    customer.PhoneNumber = phoneNumber;
        //    customer.WebSiteUrl = webSiteUrl;

        //    try
        //    {

        //        customersDataService.CreateSession();

        //        customersBusinessRules.ValidateCustomer(customer, customersDataService);

        //        if (customersBusinessRules.ValidationStatus == true)
        //        {
        //            customersDataService.BeginTransaction();
        //            customersDataService.CreateCustomer(customer);
        //            customersDataService.CommitTransaction(true);
        //            transaction.ReturnStatus = true;
        //            transaction.ReturnMessage.Add("Customer successfully created.");
        //        }
        //        else
        //        {
        //            //transaction.ReturnStatus = customersBusinessRules.ValidationStatus;
        //            //transaction.ReturnMessage = customersBusinessRules.ValidationMessage;
        //            //transaction.ValidationErrors = customersBusinessRules.ValidationErrors;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        transaction.ReturnMessage = new List<string>();
        //        string errorMessage = ex.Message;
        //        transaction.ReturnStatus = false;
        //        transaction.ReturnMessage.Add(errorMessage);
        //    }
        //    finally
        //    {
        //        customersDataService.CloseSession();
        //    }

        //    return customer;


        //}
        /// <summary>
        /// Create Customer
        /// </summary>
        /// <param name="customer"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public Customer CreateCustomer(Customer customer, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            try
            {
                CustomerBusinessRules customerBusinessRules = new CustomerBusinessRules();
                ValidationResult results = customerBusinessRules.Validate(customer);

                bool validationSucceeded = results.IsValid;
                IList<ValidationFailure> failures = results.Errors;

                if (validationSucceeded == false)
                {
                    transaction = ValidationErrors.PopulateValidationErrors(failures);
                    return customer;
                }

                customersDataService.CreateSession();
                customersDataService.BeginTransaction();
                customersDataService.CreateCustomer(customer);
                customersDataService.CommitTransaction(true);

                transaction.ReturnStatus = true;
                transaction.ReturnMessage.Add("Customer successfully created.");

            }
            catch (Exception ex)
            {
                string errorMessage = ex.Message;
                transaction.ReturnMessage.Add(errorMessage);
                transaction.ReturnStatus = false;
            }
            finally
            {
                customersDataService.CloseSession();
            }

            return customer;


        }
        /// <summary>
        /// Update Customer
        /// </summary>
        /// <param name="customer"></param>
        /// <param name="transaction"></param>
        public void UpdateCustomer(Customer customer, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            try
            {

                CustomerBusinessRules customerBusinessRules = new CustomerBusinessRules();
                ValidationResult results = customerBusinessRules.Validate(customer);

                bool validationSucceeded = results.IsValid;
                IList<ValidationFailure> failures = results.Errors;

                if (validationSucceeded == false)
                {
                    transaction = ValidationErrors.PopulateValidationErrors(failures);
                    return;
                }

                customersDataService.CreateSession();
                customersDataService.BeginTransaction();

                Customer existingCustomer = customersDataService.GetCustomer(customer.CustomerID);

                existingCustomer.CustomerCode = customer.CustomerCode;
                existingCustomer.CompanyName = customer.CompanyName;
                existingCustomer.ContactName = customer.ContactName;
                existingCustomer.ContactTitle = customer.ContactTitle;
                existingCustomer.Address = customer.Address;
                existingCustomer.City = customer.City;
                existingCustomer.Region = customer.Region;
                existingCustomer.PostalCode = customer.PostalCode;
                existingCustomer.Country = customer.Country;
                existingCustomer.MobileNumber = customer.MobileNumber;
                existingCustomer.PhoneNumber = customer.PhoneNumber;

                customersDataService.UpdateCustomer(customer);
                customersDataService.CommitTransaction(true);

                transaction.ReturnStatus = true;
                transaction.ReturnMessage.Add("Customer was successfully updated.");

            }
            catch (Exception ex)
            {
                string errorMessage = ex.Message;
                transaction.ReturnMessage.Add(errorMessage);
                transaction.ReturnStatus = false;
            }
            finally
            {
                customersDataService.CloseSession();
            }


        }
        public void DeleteCustomers(int[] customerIds, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            try
            {

                CustomerBusinessRules customerBusinessRules = new CustomerBusinessRules();
                // ValidationResult results = customerBusinessRules.Validate(customer);

                //bool validationSucceeded = results.IsValid;
                //IList<ValidationFailure> failures = results.Errors;

                //if (validationSucceeded == false)
                //{
                //    transaction = ValidationErrors.PopulateValidationErrors(failures);
                //    return;
                //}

                customersDataService.CreateSession();
                customersDataService.BeginTransaction();

                customersDataService.DeleteCustomers(customerIds);

              
                customersDataService.CommitTransaction(true);

                transaction.ReturnStatus = true;
                transaction.ReturnMessage.Add("Customer was successfully deleted.");

            }
            catch (Exception ex)
            {
                string errorMessage = ex.Message;
                transaction.ReturnMessage.Add(errorMessage);
                transaction.ReturnStatus = false;
            }
            finally
            {
                customersDataService.CloseSession();
            }


        }
        /// <summary>
        /// Import Customers
        /// </summary>
        /// <param name="transaction"></param>
        //public void ImportCustomers(out TransactionalInformation transaction)
        //{
        //    transaction = new TransactionalInformation();

        //    try
        //    {

        //        string importFileName = ConfigurationManager.AppSettings["CustomerImportData"];

        //        System.IO.StreamReader csv_file = File.OpenText(importFileName);

        //        customersDataService.CreateSession();

        //        Boolean firstLine = true;
        //        int customerRecordsAdded = 0;

        //        while (csv_file.Peek() >= 0)
        //        {
        //            // read and add a line
        //            string line = csv_file.ReadLine();
        //            string[] columns = line.Split('\t');
        //            if (firstLine == false) {
        //                if (ImportCustomer(columns)==true)
        //                    customerRecordsAdded++;
        //            }
        //            firstLine = false;
        //        }

        //        customersDataService.CommitTransaction(true);

        //        csv_file.Close();

        //        transaction.ReturnStatus = true;
        //        transaction.ReturnMessage.Add(customerRecordsAdded.ToString() + " customer successfully imported.");

        //    }
        //    catch (Exception ex)
        //    {
        //        transaction.ReturnMessage = new List<string>();
        //        string errorMessage = ex.Message;
        //        transaction.ReturnStatus = false;
        //        transaction.ReturnMessage.Add(errorMessage);
        //    }
        //    finally
        //    {
        //        customersDataService.CloseSession();
        //    }


        //}

        ///// <summary>
        ///// Import Customer
        ///// </summary>
        ///// <param name="columns"></param>
        ///// <returns></returns>
        //private Boolean ImportCustomer(string[] columns)
        //{

        //    Customer customer = new Customer();

        //    customer.CustomerCode = columns[0].Trim();
        //    customer.CompanyName = columns[1].Trim();
        //    customer.Address = columns[4].Trim();
        //    customer.City = columns[5].Trim();
        //    customer.Region = columns[6].Trim();
        //    customer.PostalCode = columns[7].Trim();
        //    customer.Country = columns[8].Trim();
        //    customer.PhoneNumber = columns[9].Trim();

        //    Boolean valid = customersDataService.ValidateDuplicateCustomer(customer.CustomerCode);
        //    if (valid)
        //    {
        //        customersDataService.CreateCustomer(customer);
        //    }

        //    return valid;

        //}


    }
}
