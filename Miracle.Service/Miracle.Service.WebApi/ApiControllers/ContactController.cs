using Miracle.Service.WebApi.Converter;
using Miracle.Service.WebApi.CrossCutting;
using Miracle.Service.WebApi.Dal;
using Miracle.Service.WebApi.Models;
using System.Linq;
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
        public MiracleUser[] GetChildContacts(long Id)
        {            
            return _userRepository.FindChildContacts(Id).Select(c => c.ConvertToMiracleUser()).ToArray();         
        }

        [HttpPost]
        public MiracleUser UpdateStatus(MiracleUser user)
        {
            var userId = this.User.Identity.ConvertToUser().UserId;
            var dbUser = user.ConvertToUserForStatusChange();
            var dbContact = user.ConvertToContactsForStatusChange(userId);
            _userRepository.ChangeStatus(dbUser, dbContact);
            return _userRepository.FindUser(user.UserId).ConvertToMiracleUser();
        }

        [HttpPost]
        public MiracleUser AddContact(MiracleUser user)
        {
            var userId = this.User.Identity.ConvertToUser().UserId;
            var dbUser = user.ConvertToUser();
            var dbContact = user.ConvertToContacts(userId);
            _userRepository.AddContact(dbUser, dbContact);
            return _userRepository.FindUser(dbUser.UserId).ConvertToMiracleUser();
        }

        [HttpPost]
        public MiracleUser UpdateContact(MiracleUser user)
        {
            var userId = this.User.Identity.ConvertToUser().UserId;            
            var dbContact = user.ConvertToContacts(userId);
            var dbUser = user.ConvertToForUpdateUser();
            _userRepository.UpdateContact(dbUser,dbContact);
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
