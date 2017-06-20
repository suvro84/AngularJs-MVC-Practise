using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using CodeProject.Business.Entities;
using System.Data.Entity;
using AngularJs_MVC_Routing.Models;

namespace AngularJs_MVC_Routing.ApplicationService
{
    /// <summary>
    /// CodeProject Entity Framework Database Context
    /// </summary>
    public class CodeProjectDatabase : DbContext
    {

        public DbSet<Customer> Customers { get; set; }
        //public DbSet<Product> Products { get; set; }
        public CodeProjectDatabase()
            : base("CodeProjectDatabase")
        {
        }
        /// <summary>
        /// Model Creation
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>().ToTable("dbo.Customers");
           // modelBuilder.Entity<Product>().ToTable("dbo.Products");
         


        }
    }
}
