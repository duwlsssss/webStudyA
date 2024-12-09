import { useState } from "react";
import * as S from './Home.styles'
import { MovieCard, CardSkeletonList, Error } from "../../components";
import useFetchMovies from '../../hooks/queries/useFetchMovies' 
import { TMovieCategory } from '../../types/movie'

export const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<TMovieCategory>('now_playing'); 

  const {
    data,
    isLoading,
    isError,
    isFetching
  } = useFetchMovies({category: selectedCategory, page: currentPage});

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleCategoryChange = (category: TMovieCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리가 변경되면 페이지를 1로 초기화
  };

  const categories = new Map([
    ['now_playing', {title: '현재 상영중인', category:`now_playing`}],
    ['popular', {title: '인기있는', category:`popular`}],
    ['top_rated', {title: '높은 평가를 받은', category:`top_rated`}],
    ['upcoming', {title: '개봉예정인', category:`upcoming`}],
  ]);

  if (isLoading){
    return(
      <>
        <S.CategoryContainer>
          {Array.from(categories.keys()).map((key) => (
            <S.CategoryButton
              key={key}
              $active={selectedCategory===key}
              onClick={() => handleCategoryChange(key as TMovieCategory)}
            >
              {categories.get(key)?.title}
            </S.CategoryButton>
          ))}
        </S.CategoryContainer>
        <S.MoviesContainer>
          <CardSkeletonList number={20}/>
        </S.MoviesContainer>
      </>
    )  
  }

  if(isError){
    return <Error message="오류가 발생했습니다." />;
  }

  return (
    <>
      <S.CategoryContainer>
        {Array.from(categories.keys()).map((key) => (
          <S.CategoryButton
            key={key}
            $active={selectedCategory===key}
            onClick={() => handleCategoryChange(key as TMovieCategory)}
          >
            {categories.get(key)?.title}
          </S.CategoryButton>
        ))}
      </S.CategoryContainer>
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
            <S.PageDesc>Page {currentPage} of {Math.min(data?.total_pages,5)}</S.PageDesc>
            <S.NextBtn onClick={handleNextPage} disabled={currentPage >= Math.min(data?.total_pages,5) || isFetching}>
              {isFetching ? 'Loading' : 'NEXT'}
            </S.NextBtn>
          </S.BtnInner>
        </S.BtnContainer>
      ) : ('')}
    </>
  );
}