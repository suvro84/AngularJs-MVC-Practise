using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJs_MVC_Routing.Controllers
{
    public class CustomersController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

      
        public ActionResult CustomerInquiry()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult CustomerMaintenance()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult CustomerInquiry1()
        {
            ViewBag.Message = "Your CustomerInquiry1 page.";

            return View();
        }
        public ActionResult CustomerEntryDetails()
        {
            ViewBag.Message = "Your CustomerEntryDetails page.";

            return View();
        }
    }
}