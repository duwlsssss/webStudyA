import React from "react";
import * as S from './MovieCard.styles';
import { useNavigate } from "react-router-dom";
import defaultPoster from '../../assets/img/movie/poster/poster_null.png';

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <S.Card
      key={movie.id}
      onClick={() => navigate(`/movies/${movie.id}`, {
        replace: false,
        state: {
          title: movie.title ?? '',
          backdrop_path: movie.backdrop_path ?? '',
          vote_average: movie.vote_average ? movie.vote_average.toFixed(2) : '',
          overview: movie.overview ?? '',
          release_year: movie.release_date ? movie.release_date.slice(0, 4) : '',
          tagline: movie.tagline ?? '',
          runtime: movie.runtime ?? ''
        }
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

