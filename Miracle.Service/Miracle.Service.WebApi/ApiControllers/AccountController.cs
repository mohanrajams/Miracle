using Miracle.Service.WebApi.CrossCutting;
using Miracle.Service.WebApi.Dal;
using Miracle.Service.WebApi.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Miracle.Service.WebApi.ApiControllers
{
    public class AccountController : ApiController
    {
        private LoginHistoryRepository _loginHistoryRepository = new LoginHistoryRepository();
        private UserRepository _userRepository = new UserRepository();

        [HttpGet]
        public bool Logout(long Id)
        {
            _loginHistoryRepository.UpdateHistory(Id);
            return true;
        }

        [HttpPost]
        public bool ChangePassword(ChangePassword input)
        {
            var oldHashedPassword = _userRepository.GetOldPassword(input.UserId);

            if (input.IsValid())
            {
                if (SecurePasswordHasher.Verify(input.OldPassword, oldHashedPassword))
                {
                    var newHashedPassword = SecurePasswordHasher.Hash(input.NewPassword);
                    _userRepository.ChangePassword(input.UserId, newHashedPassword);
                    return true;
                }
                else
                {
                    var response = Request.CreateResponse(HttpStatusCode.InternalServerError, "Old password doesn't match");
                    throw new HttpResponseException(response);
                }
            }
            else
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError, "Model validation failed");
                throw new HttpResponseException(response);
            }
        }

    }
}
