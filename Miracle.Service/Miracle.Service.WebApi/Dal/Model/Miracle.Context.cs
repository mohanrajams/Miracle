﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Miracle.Service.WebApi.Dal.Model
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MiracleEntities : DbContext
    {
        public MiracleEntities()
            : base("name=MiracleEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<LookupCategoryDIM> LookupCategoryDIMs { get; set; }
        public virtual DbSet<LookupDIM> LookupDIMs { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<LoginHistory> LoginHistories { get; set; }
    }
}
