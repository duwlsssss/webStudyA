import * as S from './MovieCard.styles';
import { useNavigate } from "react-router-dom";
import { CardSkeleton, Error } from '..';
import useFetchMovieDetails from '../../hooks/queries/useFetchMovieDetails';
import defaultPoster from '../../assets/img/movie/poster/poster_null.png';
import {TMovie} from '../../types/movie'

export const MovieCard = ({ movieId }:{movieId:number}) => {
  const navigate = useNavigate();
  const { data: movie, isLoading, isError } = useFetchMovieDetails(movieId);

  if (isLoading) return <CardSkeleton />;
  if (isError) return <Error message="영화 정보를 가져오는 중 오류가 발생했습니다." />;

  const formattedMovieData: TMovie = {
    id: movie.id ?? 0, 
    title: movie.title ?? '',
    backdrop_path: movie.backdrop_path ?? '',
    vote_average: movie.vote_average ? movie.vote_average.toFixed(2) : '',
    overview: movie.overview ?? '',
    release_year: movie.release_date ? movie.release_date.slice(0, 4) : '',
    tagline: movie.tagline ?? '',
    runtime: movie.runtime ?? '',
  };
  ;

  return (
    <S.Card
      onClick={() => navigate(`/movies/${movie.id}`, {
        replace: false,
        state: { movie: formattedMovieData }
      })}
    >
      <S.CardImg
        src={movie.poster_path ? `${import.meta.env.VITE_TMDB_IMG_URL}${movie.poster_path}` : defaultPoster}
        alt={movie.title || '영화 포스터'}
      />
      <S.CardTitle>{movie.title}</S.CardTitle>
      <S.CardReleaseDate>{movie.release_date}</S.CardReleaseDate>
    </S.Card>
  );
};

