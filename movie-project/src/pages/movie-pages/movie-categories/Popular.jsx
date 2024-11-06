import React, { useState, useEffect } from "react";
import * as S from './MovieCategories.styles'
import { MovieCard, CardSkeletonList, Error } from "../../../components";
import useFetchMovies from '../../../hooks/queries/useFetchMovies' 

export const Popular = ({category}) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchMovies(category);

  if (isLoading){
    return(
      <S.MoviesContainer>
        <CardSkeletonList number={20}/>
      </S.MoviesContainer>
    )  
  }
  
  if(isError){
    return <Error message="오류가 발생했습니다." />;
  }

  return (
    <S.MoviesContainer>
      {data?.pages?.map((page) =>
        page.results?.map((movie) => (
          <MovieCard key={movie.id} movieId={movie.id}/>
        ))
      )}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button>
    </S.MoviesContainer>
  );
}