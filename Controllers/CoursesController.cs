using GymFit.Models;
using Microsoft.AspNet.OData;
using System.Web.Http;

namespace GymFit.Controllers
{
    public class CoursesController : ODataController
    {
        GymFitContext db = new GymFitContext();
        public CoursesController() { }

        [EnableQuery]
        public IQueryable<Course> Get()
        {
            return db.Courses;
        }

        public async Task<IHttpActionResult> Post(Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Courses.Add(course);
            await db.SaveChangesAsync();
            return Created(course);
        }
    }
}
