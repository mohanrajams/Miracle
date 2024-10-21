using Miracle.Service.WebApi.CrossCutting;
using Miracle.Service.WebApi.Dal.Model;
using Miracle.Service.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Miracle.Service.WebApi.Dal
{
    public class UserRepository
    {

        public bool IsMobileNumberAlreadyExists(long contactId, string mobileNumber)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Configuration.LazyLoadingEnabled = false;
                ctx.Configuration.ProxyCreationEnabled = false;

                return ctx
                    .Contacts
                    .Any(c => c.ContactId != contactId && c.MobileNumber == mobileNumber.Trim());
            }
        }

        public bool IsEmailAlreadyExists(long userId, string email)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Configuration.LazyLoadingEnabled = false;
                ctx.Configuration.ProxyCreationEnabled = false;

                return ctx
                    .Users
                    .Any(c => c.UserId != userId && c.EmailId == email.Trim());
            }
        }

        public User FindUser(string emailId, string password)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Configuration.LazyLoadingEnabled = false;
                ctx.Configuration.ProxyCreationEnabled = false;

                var user = ctx
                    .Users
                    .FirstOrDefault(m => m.EmailId == emailId && m.IsActive);

                if (user != null && SecurePasswordHasher.Verify(password, user.Password))
                {
                    return user;
                }
                else
                {
                    return null;
                }

            }
        }

        public Contact FindUser(long userId)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Configuration.LazyLoadingEnabled = false;
                ctx.Configuration.ProxyCreationEnabled = false;

                return ctx
                    .Contacts
                    .Include(u => u.User)
                    .Include(u => u.User1)
                    .Include(u => u.LookupDIM)
                    .Include(u => u.LookupDIM1)
                    .FirstOrDefault(u => u.UserId == userId);
            }
        }

        public List<Contact> FindChildContacts(long userId)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Configuration.LazyLoadingEnabled = false;
                ctx.Configuration.ProxyCreationEnabled = false;

                return ctx
                    .Contacts
                    .Include(u => u.User)
                    .Include(u => u.User1)
                    .Include(u => u.LookupDIM1)
                    .Where(u => u.RefererId == userId && u.IsActive.HasValue && u.IsActive.Value)
                    .ToList();
            }
        }

        public long AddContact(User user, Contact contact)
        {
            using (var ctx = new MiracleEntities())
            {
                user.Contacts1.Add(contact);
                ctx.Users.Add(user);
                ctx.SaveChanges();
                return user.UserId;
            }
        }

        public long UpdateContact(User user, Contact contact)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Configuration.ValidateOnSaveEnabled = false;
                ctx.Contacts.Attach(contact);
                ctx.Users.Attach(user);

                ctx.Entry(contact).Property((u) => u.City).IsModified = true;
                ctx.Entry(contact).Property((u) => u.Dob).IsModified = true;
                ctx.Entry(contact).Property((u) => u.MobileNumber).IsModified = true;
                ctx.Entry(contact).Property((u) => u.ModifiedBy).IsModified = true;
                ctx.Entry(contact).Property((u) => u.ModifiedDate).IsModified = true;
                ctx.Entry(contact).Property((u) => u.Name).IsModified = true;
                ctx.Entry(contact).Property((u) => u.SexId).IsModified = true;

                ctx.Entry(user).Property((u) => u.EmailId).IsModified = true;

                ctx.SaveChanges();

                return contact.ContactId;
            }
        }

        public void ChangeStatus(User user, Contact contact)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Configuration.ValidateOnSaveEnabled = false;
                ctx.Users.Attach(user);
                ctx.Contacts.Attach(contact);

                ctx.Entry(user).Property((u) => u.IsActive).IsModified = true;
                ctx.Entry(contact).Property((c) => c.StatusId).IsModified = true;
                ctx.Entry(contact).Property((c) => c.ModifiedDate).IsModified = true;
                ctx.Entry(contact).Property((c) => c.ModifiedBy).IsModified = true;

                ctx.SaveChanges();
            }
        }

        public void DeleteContact(User user, Contact contact)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Configuration.ValidateOnSaveEnabled = false;
                ctx.Users.Attach(user);
                ctx.Contacts.Attach(contact);

                ctx.Entry(user).Property((u) => u.IsActive).IsModified = true;

                ctx.Entry(contact).Property((c) => c.IsActive).IsModified = true;
                ctx.Entry(contact).Property((c) => c.ModifiedDate).IsModified = true;
                ctx.Entry(contact).Property((c) => c.ModifiedBy).IsModified = true;

                ctx.SaveChanges();
            }
        }

        public void DeleteUser(User user)
        {
            using (var ctx = new MiracleEntities())
            {
                ctx.Users.Attach(user);
                ctx.SaveChanges();
            }
        }

        public string GetOldPassword(long userId)
        {
            using(var ctx=new MiracleEntities())
            {
                var user = ctx.Users.FirstOrDefault(u => u.UserId == userId);
                return user.Password;
            }
        }

        public void ChangePassword(long userId,string password)
        {
            using (var ctx = new MiracleEntities())
            {
                var user = ctx.Users.FirstOrDefault(u => u.UserId == userId);
                user.Password = password;
                ctx.SaveChanges();
            }
        }
    }
}