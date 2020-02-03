using Miracle.Service.WebApi.Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Miracle.Service.WebApi.Dal
{
    public class LoginHistoryRepository
    {
        public void AddLoginHistory(long userId)
        {
            using (var ctx = new MiracleEntities())
            {
                var loginHistory = new LoginHistory()
                {
                    UserId=userId,
                    LoginDate=DateTime.Now
                };

                ctx.LoginHistories.Add(loginHistory);

                ctx.SaveChanges();
            }
        }

        public void UpdateHistory(long userId)
        {
            using (var ctx = new MiracleEntities())
            {
                var loginHistory = ctx.LoginHistories
                     .Where(l => l.UserId == userId)
                     .OrderByDescending(l => l.LoginHistoryId)
                     .FirstOrDefault();

                loginHistory.LogoutDate = DateTime.Now;

                ctx.SaveChanges();
            }
        }
    }
}