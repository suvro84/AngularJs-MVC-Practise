using CodeProject.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJs_MVC_Routing.Models
{
    public class Employee : TransactionalInformation
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
        public List<Employee> Employees { get; set; }
    }
}