using Miracle.Service.WebApi.Converter;
using Miracle.Service.WebApi.CrossCutting;
using Miracle.Service.WebApi.Dal;
using Miracle.Service.WebApi.Models;
using Newtonsoft.Json;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Miracle.Service.WebApi.ApiControllers
{
    [Authorize]
    public class ContactController : ApiController
    {
        private UserRepository _userRepository;

        public ContactController()
        {
            _userRepository = new UserRepository();
        }


        [HttpGet]
        public MiracleUser GetUser()
        {
            var userId = this.User.Identity.ConvertToUser().UserId;
            var userDetail = _userRepository.FindUser(userId).ConvertToMiracleUser();
            userDetail.TeamMembers = new MiracleUser[0];
            return userDetail;
        }

        [HttpGet]
        public MiracleUser GetUser(long Id)
        {
            var userDetail = _userRepository.FindUser(Id).ConvertToMiracleUser();
            userDetail.TeamMembers = _userRepository.FindChildContacts(Id).Select(c => c.ConvertToMiracleUser()).ToArray();
            return userDetail;
        }

        [HttpPost]
        public MiracleUser UpdateStatus(MiracleUser user)
        {
            var userMail = _userRepository.FindUser(user.UserId).ConvertToMiracleUser().EmailId;

            if (string.IsNullOrEmpty(userMail) && user.StatusId == 4)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError, "EmailId doesn't exists");
                throw new HttpResponseException(response);
            }

            var userId = this.User.Identity.ConvertToUser().UserId;
            var dbUser = user.ConvertToUserForStatusChange();
            var dbContact = user.ConvertToContactsForStatusChange(userId);
            _userRepository.ChangeStatus(dbUser, dbContact);
            var userDetail = _userRepository.FindUser(user.UserId).ConvertToMiracleUser();
            userDetail.TeamMembers = _userRepository.FindChildContacts(user.UserId).Select(c => c.ConvertToMiracleUser()).ToArray();
            return userDetail;
        }

        [HttpPost]
        public MiracleUser AddContact(MiracleUser user)
        {
            var validationResult = user.IsValid();

            if (!validationResult.Item1)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError, validationResult.Item2);
                throw new HttpResponseException(response);
            }

            var userId = this.User.Identity.ConvertToUser().UserId;
            var dbUser = user.ConvertToUser();
            var dbContact = user.ConvertToContactsForAdd(userId);
            _userRepository.AddContact(dbUser, dbContact);
            return _userRepository.FindUser(dbUser.UserId).ConvertToMiracleUser();
        }

        [HttpPost]
        public MiracleUser UpdateContact(MiracleUser user)
        {
            var validationResult = user.IsValidForUpdate();

            if (!validationResult.Item1)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError, validationResult.Item2);
                throw new HttpResponseException(response);
            }

            var userId = this.User.Identity.ConvertToUser().UserId;
            var dbContact = user.ConvertToContacts(userId);
            var dbUser = user.ConvertToForUpdateUser();
            _userRepository.UpdateContact(dbUser, dbContact);
            return _userRepository.FindUser(user.UserId).ConvertToMiracleUser();
        }

        [HttpPost]
        public MiracleUser DeleteContact(MiracleUser user)
        {
            var userId = this.User.Identity.ConvertToUser().UserId;
            var dbUser = user.ConvertToUserForDelete();
            var dbContact = user.ConvertToContactForDelete(userId);
            _userRepository.DeleteContact(dbUser, dbContact);
            return _userRepository.FindUser(user.UserId).ConvertToMiracleUser();
        }
    }
}
