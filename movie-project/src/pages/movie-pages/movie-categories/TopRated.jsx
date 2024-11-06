import React, { useRef, useState, useEffect } from "react";
import * as S from './MovieCategories.styles'
import { MovieCard, CardSkeletonList, Error } from "../../../components";
import useFetchMovies from '../../../hooks/queries/useFetchMovies' 

export const TopRated = ({category}) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchMovies(category, false);

  const loadMoreRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px", //페이지 하단에 도달하기 100px 전에 추가 로드
        threshold: 1.0, 
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


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
      <div ref={loadMoreRef} style={{ height: "1px" }} />
      {isFetchingNextPage && <CardSkeletonList number={10}/>}
    </S.MoviesContainer>
  );
}