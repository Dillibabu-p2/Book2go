using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;

namespace BookMyShowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {

        private static List<Movie> Movies = new List<Movie>
        {
            new () { Id =1, Title = "Avengers" , Genre = "Drama"},
            new () { Id =2, Title = "Batman" , Genre = "Action"},
            new () { Id=3, Title= "Lucy", Genre = "Drama"},
        };


        [HttpGet]
        public IActionResult GetMovies()
        {
            return Ok(Movies);
        }

        [HttpPost]
        public IActionResult AddMovie([FromBody] Movie movie)
        {
            movie.Id = Movies.Count + 1;
            Movies.Add(movie);
            return Ok(movie);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            var movie = Movies.FirstOrDefault(m => m.Id == id);
            if (movie == null)
            {
                return NotFound();
            }
            Movies.Remove(movie);
            return NoContent();
        }

        [HttpPost("book")]
        public IActionResult BookTicket([FromBody] Ticket ticket)
        {
            return Ok($"Ticker booked successfully for {ticket.MovieTitle}!");
        }
    }


    public class Ticket
    {
        public string? MovieTitle { get; set; }
        public string? UserEmail { get; set; }
        public int Seats { get; set; }
    }
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Genre { get; set; }
    }



}