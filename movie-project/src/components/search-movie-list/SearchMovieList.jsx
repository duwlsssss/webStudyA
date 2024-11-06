import React, { useState } from "react";
import * as S from './SearchMovieList.styles';
import { MovieCard } from '../movie-card/MovieCard'
import { CardSkeletonList } from "../movie-card/skeleton/CardSkeletonList";
import { useSearchParams } from "react-router-dom";
import useFetchMovies from "../../hooks/queries/useFetchMovies";

export const SearchMovieList = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const mq = searchParams.get('mq');

  const url = mq ? `/search/movie?query=${encodeURIComponent(mq)}&include_adult=false&language=ko&page=1&region=KR` : null;
  const { data: movies, isLoading, isError } = useFetchMovies(url);


  if (isLoading){
    return(
      <S.MoviesContainer>
        <CardSkeletonList number={20}/>
      </S.MoviesContainer>
    )  
  }

  if(isError){
    return (
      <S.MoviesContainer>
        <S.ErrorMessage>오류가 발생했습니다.</S.ErrorMessage>
      </S.MoviesContainer>
    )
  }


  if(mq && movies?.results?.length === 0){
    return (
      <S.MoviesContainer>
        <S.ErrorMessage>{mq}에 대한 검색 결과가 없습니다.</S.ErrorMessage>
      </S.MoviesContainer>
    )
  }

  return (
    <S.MoviesContainer>
      {movies?.results?.map((movie) => {
        return <MovieCard key={movie.id} movieId={movie.id} />;
      })}
    </S.MoviesContainer>
  );
};
