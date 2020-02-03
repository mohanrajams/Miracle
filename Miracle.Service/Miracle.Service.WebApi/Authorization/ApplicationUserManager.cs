using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Miracle.Service.WebApi.Converter;
using Miracle.Service.WebApi.Dal;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Miracle.Service.WebApi.Authorization
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        private UserRepository _userRepository;

        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
            _userRepository = new UserRepository();
        }

        public override Task<ApplicationUser> FindAsync(string userName, string password)
        {
            return Task.Run(() =>
            {
                return _userRepository.FindUser(userName, password)?.ConvertToApplicationUser();
            });
        }

        public override Task<ClaimsIdentity> CreateIdentityAsync(ApplicationUser user, string authenticationType)
        {
            return Task.Run(() =>
            {
                return new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.NameIdentifier, user.Id) });
            });
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            return new ApplicationUserManager(new UserStore<ApplicationUser>());
        }
    }
}