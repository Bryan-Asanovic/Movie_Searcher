import React from 'react';
import { X, Star, Clock, Film } from 'lucide-react';
import { MovieDetails } from '../types';

interface MovieModalProps {
  movie: MovieDetails;
  imageBaseUrl: string;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, imageBaseUrl, onClose }) => {
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}/w500${movie.poster_path}`
    : null;
  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}/original${movie.backdrop_path}`
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {backdropUrl && (
          <div 
            className="h-64 w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        )}
        
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-80 flex-shrink-0">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full h-[500px] object-cover"
                />
              ) : (
                <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
                  <Film className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="p-6 flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {movie.title}
              </h2>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-lg font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                
                {movie.runtime > 0 && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Overview</h3>
                  <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Release Date</h3>
                  <p className="text-gray-900">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                {movie.director && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Director</h3>
                    <p className="text-gray-900">{movie.director}</p>
                  </div>
                )}
                
                {movie.cast && movie.cast.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Cast</h3>
                    <div className="space-y-1">
                      {movie.cast.map((actor) => (
                        <p key={actor.id} className="text-gray-700">
                          <span className="font-medium">{actor.name}</span>
                          {actor.character && (
                            <span className="text-gray-500"> as {actor.character}</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;