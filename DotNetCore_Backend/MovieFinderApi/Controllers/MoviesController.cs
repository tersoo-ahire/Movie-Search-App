using Microsoft.AspNetCore.Mvc;
using MovieFinderApi.Models;
using Newtonsoft.Json;
using System.Net;
using Microsoft.AspNetCore.Cors; // Import the CORS namespace

namespace MovieFinderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors] // Apply the CORS policy here
    public class MoviesController : ControllerBase
    {
        private readonly ILogger<MoviesController> _logger;

        public MoviesController(ILogger<MoviesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("search")]
        public async Task<ActionResult<MovieSearchResult>> SearchMovies([FromQuery] string s)
        {
            try
            {
                // Make a request to the OMDB API to search for movies using the provided title
                // Process the response and return the search results as JSON
                const string apiKey = "fde9193e";
                var encodedTitle = WebUtility.UrlEncode(s);
                var apiUrl = $"http://www.omdbapi.com/?apikey={apiKey}&s={encodedTitle}";

                using var client = new HttpClient();
                var response = await client.GetAsync(apiUrl);
                // Check the status code of the response
                if (response.IsSuccessStatusCode)
                {
                    // Only deserialize the content if the status code is successful
                    var content = await response.Content.ReadAsStringAsync();
                    var searchDetails = JsonConvert.DeserializeObject<MovieSearchResult>(content);

                    // The rest of your logic
                    if (searchDetails != null && searchDetails.Response == "True")
                    {
                        return Ok(searchDetails);
                    }
                    else
                    {
                        return NotFound("No movies found.");
                    }
                }
                else
                {
                    // Handle the error if the status code is not successful
                    return StatusCode((int)response.StatusCode, "An error occurred while calling the OMDB API.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while searching for movies.");
                return StatusCode(500, "An error occurred while searching for movies.");
            }
        }

        [HttpGet("movie-details")]
        public async Task<ActionResult<MovieDetailResult>> GetMovieTitle([FromQuery] string t)
        {
            try
            {
                // Replace "YOUR_OMDB_API_KEY" with your actual OMDB API key
                const string apiKey = "fde9193e";
                var encodedTitle = WebUtility.UrlEncode(t);
                var apiUrl = $"http://www.omdbapi.com/?apikey={apiKey}&t={encodedTitle}";

                using var client = new HttpClient();
                var response = await client.GetAsync(apiUrl);

                // Check the status code of the response
                if (response.IsSuccessStatusCode)
                {
                    // Only deserialize the content if the status code is successful
                    var content = await response.Content.ReadAsStringAsync();
                    var movieDetails = JsonConvert.DeserializeObject<MovieDetailResult>(content);

                    // The rest of your logic
                    if (movieDetails != null && movieDetails.Response == "True")
                    {
                        return Ok(movieDetails);
                    }
                    else
                    {
                        return NotFound("No movies found.");
                    }
                }
                else
                {
                    // Handle the error if the status code is not successful
                    return StatusCode((int)response.StatusCode, "An error occurred while calling the OMDB API.");
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