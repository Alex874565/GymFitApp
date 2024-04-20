using GymFit.Models;
using Microsoft.AspNet.OData;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace GymFit.Controllers
{
    public class SubscriptionsController : ODataController
    {
        GymFitContext db = new GymFitContext();

        public SubscriptionsController() { }

        [EnableQuery]
        public IQueryable<Subscription> Get()
        {
            return db.Subscriptions;
        }

        public async Task<IHttpActionResult> Post(Subscription subscription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Subscriptions.Add(subscription);
            await db.SaveChangesAsync();
            return Created(subscription);
        }
    }
}
