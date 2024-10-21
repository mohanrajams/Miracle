using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Miracle.Service.WebApi.Authorization;
using Miracle.Service.WebApi.CrossCutting;
using Owin;
using System;

[assembly: OwinStartup(typeof(Miracle.Service.WebApi.Startup))]
namespace Miracle.Service.WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureOAuthTokenGeneration(app);

            ConfigureOAuthTokenConsumption(app);
        }
        
        private void ConfigureOAuthTokenGeneration(IAppBuilder app)
        {
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/oauth/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new MiracleOAuthProvider(),
                AccessTokenFormat = new MiracleJwtFormat(Helper.GetJwtIssuer()),                
            };

            app.UseOAuthAuthorizationServer(OAuthServerOptions);
        }

        private void ConfigureOAuthTokenConsumption(IAppBuilder app)
        {
            var issuer = Helper.GetJwtIssuer();
            string audienceId = Helper.GetJwtAudienceId();
            byte[] audienceSecret = TextEncodings.Base64Url.Decode(Helper.GetJwtSecretKey());

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                AllowedAudiences = new[] { audienceId },
                IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, audienceSecret)
                }
            });
        }
    }
}
