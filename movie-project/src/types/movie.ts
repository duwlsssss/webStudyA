export type TMovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export interface TMovie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: string;
  overview: string;
  release_year: string;
  tagline: string;
  runtime: string;
}

export interface TMoviesResponse {
  results: TMovie[];
  page: number;
  total_results: number;
  total_pages: number;
}


export interface TCast {
  character: string;
  name: string;
  original_name: string;
  profile_path: string | null;
  id: number;
  known_for_department?: string;
}

export interface TMovieCredit {
  id: number;
  cast: TCast[];
}


export interface TfetchMovieProps {
  category: TMovieCategory;
  page?: number;
}





