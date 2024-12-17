using Microsoft.AspNetCore.Mvc;

namespace BookMyShowBackend.Controllers

{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private static List<User> Users = new List<User>();

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (Users.Exists(u => u.Email == user.Email))
            {
                return BadRequest("User already exists.");
            }
            Users.Add(user);
            return Ok("Registration successful");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var existingUser = Users.Find(u => u.Email == user.Email && u.Password == user.Password);
            if (existingUser == null)
            {
                return Unauthorized("Invalid credentials.");
            }
            return Ok("Login successful");

        }
    }

    public class User
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}