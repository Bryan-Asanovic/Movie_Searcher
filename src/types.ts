export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  director?: string;
  cast: { id: number; name: string; character: string }[];
}