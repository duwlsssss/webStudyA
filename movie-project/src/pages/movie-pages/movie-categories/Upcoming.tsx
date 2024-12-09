import { useEffect } from "react";
import * as S from './MovieCategories.styles'
import { useInView } from "react-intersection-observer";
import { MovieCard, CardSkeletonList, Error } from "../../../components";
import useFetchInfiniteMovies from '../../../hooks/queries/useFetchInfiniteMovies' 
import { TMovieCategory } from '../../../types/movie';

export const Upcoming = ({category}: {category: TMovieCategory}) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteMovies(category);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) { //사용해 스크롤이 하단에 도달했을 때 inView가 true
      fetchNextPage(); //그럼 fetchNextPage호 다음 페이지 가져옴
    }
  }, [inView]);


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
      {isFetchingNextPage ? (<CardSkeletonList number={10}/>) : (<div ref={ref}/>) }
    </S.MoviesContainer>
  );
}