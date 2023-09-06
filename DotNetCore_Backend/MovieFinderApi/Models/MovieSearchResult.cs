using System.Collections.Generic;

namespace MovieFinderApi.Models
{
    public class MovieSearchResult
    {
        public List<Movie> Search { get; set; } = new List<Movie>();
        public string TotalResults { get; set; } = "";
        public string Response { get; set; } = "";
    }

    public class Movie
    {
        public string Title { get; set; } = "";
        public string Year { get; set; } = "";
        public string imdbID { get; set; } = "";
        public string Type { get; set; } = "";
        public string Poster { get; set; } = "";
    }
}
