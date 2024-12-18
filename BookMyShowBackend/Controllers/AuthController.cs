using Microsoft.AspNetCore.Mvc;

namespace BookMyShowBackend.Controllers

{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private static List<User> Users = new List<User>
        {
            new() { Email = "admin@example.com" , Password = "admin123", Role = "admin" },
            new() { Email = "user@example.com" , Password = "user123", Role = "user"}
        };

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (Users.Exists(u => u.Email == user.Email))
            {
                return BadRequest("User already exists.");
            }

            if (string.IsNullOrEmpty(user.Role))
            {
                user.Role = "user";
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
            return Ok(new { email = existingUser.Email, role = existingUser.Role });

        }
    }

    public class User
    {
        public string? Email { get; set; }
        public string? Password { get; set; }

        public string? Role { get; set; }
    }
}