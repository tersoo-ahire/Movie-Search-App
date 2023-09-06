using Microsoft.AspNetCore.Mvc;
using MovieFinderApi.Models;
using Newtonsoft.Json;
using System.Net;
using Microsoft.AspNetCore.Cors; // Import the CORS namespace

namespace MovieFinderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowLocalhost5173")] // Apply the CORS policy here
    public class MoviesController : ControllerBase
    {
        private readonly ILogger<MoviesController> _logger;

        public MoviesController(ILogger<MoviesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string s)
        {
            try
            {
                // Make a request to the OMDB API to search for movies using the provided title
                // Process the response and return the search results as JSON
                var apiKey = "fde9193e";
                var encodedTitle = WebUtility.UrlEncode(s);
                var apiUrl = $"http://www.omdbapi.com/?apikey={apiKey}&s={encodedTitle}";

                using var client = new HttpClient();
                var response = await client.GetStringAsync(apiUrl);
                var searchDetails = JsonConvert.DeserializeObject<MovieSearchResult>(response);

                if (searchDetails != null && searchDetails.Response == "True")
                {
                    return Ok(searchDetails);
                }
                else
                {
                    return NotFound("No movies found.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while searching for movies.");
                return StatusCode(500, "An error occurred while searching for movies.");
            }
        }

        [HttpGet("movie-details")]
        public async Task<IActionResult> GetMovieDetailsByTitle([FromQuery] string t)
        {
            try
            {
                // Replace "YOUR_OMDB_API_KEY" with your actual OMDB API key
                var apiKey = "fde9193e";
                var encodedTitle = WebUtility.UrlEncode(t);
                var apiUrl = $"http://www.omdbapi.com/?apikey={apiKey}&t={encodedTitle}";

                using var client = new HttpClient();
                var response = await client.GetStringAsync(apiUrl);
                var movieDetails = JsonConvert.DeserializeObject<MovieDetailResult>(response);

                if (movieDetails != null && movieDetails.Response == "True")
                {
                    return Ok(movieDetails);
                }
                else
                {
                    return NotFound("Movie details not found.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching movie details.");
                return StatusCode(500, "An error occurred while fetching movie details.");
            }
        }
    }
}