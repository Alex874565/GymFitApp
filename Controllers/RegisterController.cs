using GymFit.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static GymFit.Controllers.LoginController;

namespace GymFit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : Controller
    {

        private IConfiguration _config;
        GymFitContext db = new GymFitContext();

        public RegisterController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public IResult Register([FromBody] UserData user_data)
        {
            var users = from client in db.Clients
                          where client.Email.Equals(user_data.email)
                          select client;
            if (users.Count() != 0)
            {
                Client user = new Client();
                user.Email = user_data.email;
                user.Password = user_data.password;
                user.Role = "Client";
                db.Clients.Add(user);
                db.SaveChangesAsync();
                return Results.Ok(user);
            }
            return Results.StatusCode(401);
        }
    }
}

