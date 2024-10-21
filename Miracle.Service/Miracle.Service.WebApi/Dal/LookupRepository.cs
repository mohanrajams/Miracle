using Miracle.Service.WebApi.Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Miracle.Service.WebApi.Dal
{
    public class LookupRepository
    {
        public List<LookupDIM> GetSexLookup()
        {
            using (var ctx = new MiracleEntities())
            {
                return ctx
                    .LookupDIMs
                    .Where(l => l.LookupCategoryId == 1 && l.IsActive.HasValue && l.IsActive.Value)
                    .ToList();                
            }
        }

        public List<LookupDIM> GetStatusLookup()
        {
            using (var ctx = new MiracleEntities())
            {
                return ctx
                    .LookupDIMs
                    .Where(l => l.LookupCategoryId == 2 && l.IsActive.HasValue && l.IsActive.Value)
                    .ToList();
            }
        }
    }
}