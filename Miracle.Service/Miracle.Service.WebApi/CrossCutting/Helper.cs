using Miracle.Service.WebApi.Dal.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Xml;
using System.Xml.Serialization;

namespace Miracle.Service.WebApi.CrossCutting
{
    public static class Helper
    {

        public static string GetJwtAudienceId()
        {
            return ConfigurationManager.AppSettings["JwtAudienceId"];
        }

        public static string GetJwtSecretKey()
        {
            return ConfigurationManager.AppSettings["JwtSecurityKey"];
        }

        public static string GetJwtIssuer()
        {
            return ConfigurationManager.AppSettings["JwtIssuer"];
        }

        public static string GetAuthenticationWebApiUrl()
        {
            return ConfigurationManager.AppSettings["AuthenticationWebApiUrl"];
        }

        public static string SerializeToXml<T>(this T input)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));

            using (var stringWriter = new StringWriter())
            {
                using (XmlWriter writer = XmlWriter.Create(stringWriter))
                {
                    xmlSerializer.Serialize(writer, input);
                    return stringWriter.ToString();
                }
            }
        }
     
        public static User ConvertToUser(this IIdentity input)
        {
            var claimsIdentity = (ClaimsIdentity)input;

            return new User
            {               
                UserId = long.Parse(claimsIdentity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value),             
            };
        }        
    }
}