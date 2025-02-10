import React, { useState } from 'react';
import { Search, Loader2, Film } from 'lucide-react';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { Movie, MovieDetails } from './types';

const TMDB_API_KEY = '502deffe85a5dcd183138a946da78be9';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(search)}&language=en-US&page=1&include_adult=false`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies(data.results);
      } else {
        setError('No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (movieId: number) => {
    try {
      const [movieResponse, creditsResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`)
      ]);

      const movieData = await movieResponse.json();
      const creditsData = await creditsResponse.json();

      const director = creditsData.crew.find(
        (person: { job: string }) => person.job === 'Director'
      )?.name;

      setSelectedMovie({
        ...movieData,
        director,
        cast: creditsData.cast.slice(0, 5)
      });
    } catch (err) {
      console.error('Failed to fetch movie details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <Film className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Movie Search
          </h1>
          <p className="text-lg text-gray-600">
            Search for your favorite movies and discover new ones
          </p>
        </div>

        <form onSubmit={searchMovies} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for movies..."
              className="w-full px-4 py-3 pl-12 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 px-4 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-center text-red-600 mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              imageBaseUrl={IMAGE_BASE_URL}
              onClick={() => fetchMovieDetails(movie.id)}
            />
          ))}
        </div>

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            imageBaseUrl={IMAGE_BASE_URL}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;