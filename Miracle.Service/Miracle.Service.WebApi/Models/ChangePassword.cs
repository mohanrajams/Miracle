using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Miracle.Service.WebApi.Models
{
    public class ChangePassword
    {
        public long UserId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string confirmPassword { get; set; }

        public bool IsValid()
        {
            if (!string.Equals(NewPassword, confirmPassword))
                return false;
            else if (NewPassword.Length > 15 || NewPassword.Length < 8)
                return false;
            else
                return true;
        }
    }
}