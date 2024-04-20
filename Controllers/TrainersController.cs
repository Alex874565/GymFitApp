using GymFit.Models;
using Microsoft.AspNet.OData;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace GymFit.Controllers
{
    public class TrainersController : ODataController
    {
        GymFitContext db = new GymFitContext();
        
        public TrainersController() { }

        [EnableQuery]
        public IQueryable<Trainer> Get()
        {
            return db.Trainers;
        }

        public async Task<IHttpActionResult> Post(Trainer trainer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Trainers.Add(trainer);
            await db.SaveChangesAsync();
            return Created(trainer);
        }
    }
}
