import React from 'react';
import { Film } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  imageBaseUrl: string;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, imageBaseUrl, onClick }) => {
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}/w500${movie.poster_path}`
    : null;

  const rating = typeof movie.vote_average === 'number' ? movie.vote_average : 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <Film className="w-16 h-16 text-gray-400" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </p>
          <div className="flex items-center">
            <span className="text-sm font-medium text-yellow-600">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;