import React, { useState } from "react";
import * as S from './SearchMovieList.styles';
import { MovieCard } from '../movie-card/MovieCard'
import { CardSkeletonList } from "../movie-card/skeleton/CardSkeletonList";
import { useSearchParams } from "react-router-dom";
import useFetchMovieSearchResult from "../../hooks/queries/useFetchMovieSearchResult";

export const SearchMovieList = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const mq = searchParams.get('mq');

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading,
    isError,
    isFetching
  } = useFetchMovieSearchResult(mq, currentPage, true);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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


  if(mq && data?.results?.length === 0){
    return (
      <S.MoviesContainer>
        <S.ErrorMessage>{mq}에 대한 검색 결과가 없습니다.</S.ErrorMessage>
      </S.MoviesContainer>
    )
  }

  return (
    <>
      <S.MoviesContainer>
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movieId={movie.id} />
        ))}
      </S.MoviesContainer>
      { data ? (
        <S.BtnContainer>
          <S.BtnInner>
            <S.PrevBtn onClick={handlePreviousPage} disabled={currentPage === 1}>
              PREV
            </S.PrevBtn>
            <S.PageDesc>Page {currentPage} of {data?.total_pages}</S.PageDesc>
            <S.NextBtn onClick={handleNextPage} disabled={currentPage >= data?.total_pages || isFetching}>
              {isFetching ? 'Loading' : 'NEXT'}
            </S.NextBtn>
          </S.BtnInner>
        </S.BtnContainer>
      ) : ('')}
    </>
  );
};
