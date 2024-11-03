import React, { useState, useEffect } from "react";
import * as S from './Home.styles'
import { MovieCard, CardSkeletonList, Error } from "../../components";
import useCustomFetchMovie from '../../hooks/useCustomFetchMovie' 
import {movieApi} from '../../api/apiClient'

export const Home = () => {
  const {data:movies, isLoading, isError} = useCustomFetchMovie(`/movie/now_playing?language=ko&page=1&region=KR`);
  const [movieDetails, setMovieDetails] = useState({}); //movies.results의 id로 detail 가져오고 저장할거임

  // id로 추가 데이터를 가져오는 함수
  const fetchDetails = async (movieId) => {
    try {
      const response = await movieApi.get(`/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_TOKEN}&language=ko`);
      return response.data;
    } catch (e) {
      console.error(`movie id로 디테일 가져오다 문제 생김 : ${movieId}`, e);
      return null;
    }
  };

  useEffect(() => {
    // 영화 목록이 업데이트되면 각 영화의 상세 데이터를 가져옴
    const fetchAllDetails = async () => {
      const detailsPromises = movies?.results?.map(async (movie) => {
        // movieDetails에 없는 ID의 경우에만 fetchDetails 호출
        if (!movieDetails[movie.id]) {
          const detail = await fetchDetails(movie.id);
          if (detail) {
            setMovieDetails(prevState => ({
              ...prevState,
              [movie.id]: detail  // 각 영화 ID를 키로 함
            }));
          }
        }
      });
      await Promise.all(detailsPromises);
    };
    
    if (movies?.results?.length) {
      fetchAllDetails();
    }
  }, [movies]);



  if (isLoading){
    return (
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
      {Object.values(movieDetails)?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </S.MoviesContainer>
  );
}