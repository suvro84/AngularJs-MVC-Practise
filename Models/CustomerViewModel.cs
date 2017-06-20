﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using CodeProject.Business.Entities;
using AngularJs_MVC_Routing.Models;
using CodeProject.Business.Entities;

namespace CodeProject.Portal.Models
{
    /// <summary>
    /// Customer View Model
    /// </summary>
    public class CustomerViewModel : TransactionalInformation
    {
        public int CustomerID { get; set; }
        public string CustomerCode { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string PhoneNumber { get; set; }
        public string MobileNumber { get; set; }

        public List<Customer> Customers { get; set; }

        public int[] CustomerIds { get; set; }
    }

}
