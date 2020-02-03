using System;

namespace Miracle.Service.WebApi.Models
{
    public class MiracleUser
    {
        public MiracleUser()
        {
            TeamMembers = new MiracleUser[0];
        }

        public bool LoginStatus { get; set; }
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
    }
}