using Miracle.Service.WebApi.Dal;
using Miracle.Service.WebApi.Dal.Model;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using Miracle.Service.WebApi.Models;

namespace Miracle.Service.WebApi.ApiControllers
{
    [Authorize]
    public class LookupController : ApiController
    {
        private LookupRepository _lookupRepository;

        public LookupController()
        {
            _lookupRepository = new LookupRepository();
        }

        [HttpGet]
        public Lookup GetLookup()
        {
            var sexLookup = _lookupRepository.GetSexLookup()
                .Select(s => new SexLookup
                {
                    SexId = s.LookupId,
                    SexDescription = s.LookupDescription
                }).ToArray();

            var statusLookup = _lookupRepository.GetStatusLookup()
                .Select(s => new StatusLookup
                {
                    StatusId = s.LookupId,
                    StatusDescription = s.LookupDescription
                })
                .ToArray();

            return new Lookup
            {
                Sex=sexLookup,
                Status=statusLookup
            };
        }      
    }
}
