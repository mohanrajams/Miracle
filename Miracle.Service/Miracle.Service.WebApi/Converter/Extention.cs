using Miracle.Service.WebApi.Authorization;
using Miracle.Service.WebApi.CrossCutting;
using Miracle.Service.WebApi.Dal.Model;
using Miracle.Service.WebApi.Models;
using System;

namespace Miracle.Service.WebApi.Converter
{
    public static class Extention
    {
        public static ApplicationUser ConvertToApplicationUser(this User user)
        {
            return new ApplicationUser
            {
                Id = user.UserId.ToString(),
                UserId = user.UserId
            };
        }

        public static MiracleUser ConvertToMiracleUser(this Contact contact)
        {
            return new MiracleUser()
            {
                Dob = contact.Dob,
                EmailId = contact.User1.EmailId,
                Location = contact.City,
                LoginStatus = true,
                Mobile = contact.MobileNumber.Trim(),
                SexId = contact.SexId,
                StatusId = contact.StatusId.Value,
                StatusDescription = contact.LookupDIM1.LookupDescription,
                UserId = contact.User1.UserId,
                UserName = contact.Name,
                ContactId = contact.ContactId
            };
        }

        public static User ConvertToUserForStatusChange(this MiracleUser input)
        {
            return new User
            {
                UserId = input.UserId,
                IsActive = input.StatusId == 4 ? true : false
            };
        }

        public static User ConvertToUserForDelete(this MiracleUser input)
        {
            return new User
            {
                UserId = input.UserId,
                IsActive = false
            };
        }

        public static Contact ConvertToContactForDelete(this MiracleUser input, long modifiyingUserId)
        {
            return new Contact
            {
                ContactId=input.ContactId,
                IsActive = false,
                ModifiedDate = DateTime.Now,
                ModifiedBy = modifiyingUserId
            };
        }

        public static Contact ConvertToContactsForStatusChange(this MiracleUser input, long modifiyingUserId)
        {
            return new Contact
            {
                ContactId = input.ContactId,
                StatusId = input.StatusId,
                ModifiedBy = modifiyingUserId,
                ModifiedDate = DateTime.Now
            };
        }

        public static User ConvertToUser(this MiracleUser input)
        {
            return new User
            {
                UserId = input.UserId,
                CreatedDate = DateTime.Now,
                EmailId = input.EmailId.Trim(),
                Password = SecurePasswordHasher.Hash("123456"),
                IsActive = false
            };
        }

        public static User ConvertToForUpdateUser(this MiracleUser input)
        {
            return new User
            {
                UserId = input.UserId,
                EmailId = input.EmailId.Trim()
            };
        }

        public static Contact ConvertToContacts(this MiracleUser input, long modifiyingUserId)
        {
            return new Contact
            {
                ContactId = input.ContactId,
                City = input.Location,
                Dob = input.Dob,
                IsActive = true,
                ModifiedBy = modifiyingUserId,
                MobileNumber = input.Mobile.Trim(),
                Name = input.UserName,
                SexId = input.SexId,
                StatusId = input.ContactId == 0 ? 6 : input.StatusId,                
                ModifiedDate = DateTime.Now
            };
        }

        public static Contact ConvertToContactsForAdd(this MiracleUser input, long modifiyingUserId)
        {
            return new Contact
            {
                ContactId = input.ContactId,
                City = input.Location,
                Dob = input.Dob,
                IsActive = true,
                ModifiedBy = modifiyingUserId,
                MobileNumber = input.Mobile.Trim(),
                Name = input.UserName,
                SexId = input.SexId,
                StatusId = input.ContactId == 0 ? 6 : input.StatusId,
                ModifiedDate = DateTime.Now,
                RefererId=modifiyingUserId
            };
        }
    }
}