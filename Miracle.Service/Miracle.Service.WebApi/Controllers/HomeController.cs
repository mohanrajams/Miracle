using System.Web.Mvc;

namespace Miracle.Service.WebApi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var result = new FilePathResult("~/Client.Output.Build/index.html", "text/html");
            return result;
        }
    }
}
