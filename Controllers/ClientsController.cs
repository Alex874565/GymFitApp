using GymFit.Models;
using log4net;
using Microsoft.AspNet.OData;
using System.Web.Http;

namespace GymFit.Controllers
{
    public class ClientsController : ODataController
    {
        GymFitContext db = new GymFitContext();
        public ClientsController() { }

        [EnableQuery]
        public IQueryable<Client> Get()
        {
            ILog logger = LogManager.GetLogger(typeof(Program));
            logger.Info("GET Clients");
            return db.Clients;
        }

        public async Task<IHttpActionResult> Post(Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Clients.Add(client);
            await db.SaveChangesAsync();
            return Created(client);
        }
    }
}
