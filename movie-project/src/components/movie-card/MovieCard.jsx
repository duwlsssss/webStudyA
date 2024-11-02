import React from "react";
import * as S from './MovieCard.style.js';
import { useNavigate } from "react-router-dom";
import defaultPoster from '../../assets/img/movie/cast/profile_path_null.jpg'

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <S.Card
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
      <img
        className="cardImg"
        src={movie.poster_path ? `${import.meta.env.VITE_TMDB_IMG_URL}${movie.poster_path}` : defaultPoster}
        alt={movie.title || '영화 포스터'}
      />
      <div className="cardTitle">{movie.title}</div>
      <div className="cardReleaseDate">{movie.release_date}</div>
    </S.Card>
  );
};

