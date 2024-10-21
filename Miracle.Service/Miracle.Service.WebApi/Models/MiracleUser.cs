using Miracle.Service.WebApi.Dal;
using System;
using System.Collections.Generic;

namespace Miracle.Service.WebApi.Models
{
    public class MiracleUser
    {
        private UserRepository _userRepository = new UserRepository();

        public MiracleUser()
        {
            TeamMembers = new MiracleUser[0];
            IsLoggedOut = false;
        }

        public bool LoginStatus { get; set; }
        public bool IsLoggedOut { get; set; }
        public long ContactId { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string EmailId { get; set; }
        public string Location { get; set; }
        public string StatusDescription { get; set; }
        public long StatusId { get; set; }
        public string Mobile { get; set; }
        public long SexId { get; set; }
        public DateTime Dob { get; set; }
        public MiracleUser[] TeamMembers { get; set; }

        public Tuple<bool, string[]> IsValid()
        {
            List<string> errorMessage = new List<string>();

            if (!string.IsNullOrEmpty(this.EmailId) && _userRepository.IsEmailAlreadyExists(this.UserId, this.EmailId))
            {
                errorMessage.Add("Email already exists");
            }

            if (_userRepository.IsMobileNumberAlreadyExists(this.ContactId, this.Mobile))
            {
                errorMessage.Add("Mobile number already exists");
            }

            return new Tuple<bool, string[]>(errorMessage.Count == 0, errorMessage.ToArray());
        }

        public Tuple<bool, string[]> IsValidForUpdate()
        {
            List<string> errorMessage = new List<string>();

            if(string.IsNullOrEmpty(EmailId) && StatusId == 4)
            {
                errorMessage.Add("EmailId required");
            }

            if (!string.IsNullOrEmpty(this.EmailId) && _userRepository.IsEmailAlreadyExists(this.UserId, this.EmailId))
            {
                errorMessage.Add("Email already exists");
            }

            if (_userRepository.IsMobileNumberAlreadyExists(this.ContactId, this.Mobile))
            {
                errorMessage.Add("Mobile number already exists");
            }

            return new Tuple<bool, string[]>(errorMessage.Count == 0, errorMessage.ToArray());
        }
    }
}