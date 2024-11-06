import React, { useState, useEffect } from "react";
import * as S from './Home.styles'
import { MovieCard, CardSkeletonList, Loading, Error } from "../../components";
import useFetchMovies from '../../hooks/queries/useFetchMovies' 

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading,
    isError,
    isFetching
  } = useFetchMovies('now_playing', currentPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading){
    return <Loading message="영화 정보를 가져오는 중입니다." />;
  }

  if(isError){
    return <Error message="오류가 발생했습니다." />;
  }

  return (
    <>
      <S.MoviesContainer>
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movieId={movie.id} />
        ))}
      </S.MoviesContainer>
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
    </>
  );
}