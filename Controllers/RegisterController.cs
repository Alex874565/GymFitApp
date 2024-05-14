using Microsoft.AspNetCore.Mvc;

namespace GymFit.Controllers
{
    public class RegisterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
