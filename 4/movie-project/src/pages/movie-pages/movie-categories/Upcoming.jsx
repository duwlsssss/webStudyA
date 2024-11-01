import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from './MovieCategories.module.css'
import { useCustomFetch } from '../../../hooks/useCustomFetch' 
import { axiosInstance } from '../../../api/axiosInstance'

export const Upcoming = () => {
  const navigate = useNavigate();
  const {category} = useParams();
  const [movies, isLoading, isError] = useCustomFetch(`/${category}?language=ko&page=1&region=KR`);
  const [movieDetails, setMovieDetails] = useState({}); //movies.results의 id로 detail 가져오고 저장할거임

  // id로 추가 데이터를 가져오는 함수
  const fetchDetails = async (movieId) => {
    try {
      const response = await axiosInstance.get(`/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_TOKEN}&language=ko`);
      return response.data;
    } catch (e) {
      console.error(`movie id로 디테일 가져오다 문제 생김 : ${movieId}`, e);
    }
  };

  useEffect(() => {
    // 영화 목록이 업데이트되면 각 영화의 추가 데이터를 가져옴
    movies?.results?.forEach(async (movie) => {
      const detail = await fetchDetails(movie.id);
      if (detail) {
        setMovieDetails(prevState => ({
          ...prevState,
          [movie.id]: detail  // 각 영화 ID를 키로 함
        }));
      }
    });
  }, [movies]);

  // useEffect(() => {
  //   console.log(Object.values(movieDetails));
  // }, [movieDetails]);


  if(isError){
    return <div><h1>에러 발생</h1></div>
  }
  if(isLoading){
    return <div><h1>로딩 중...</h1></div>
  }
  
  return (
    <div className={style.cardList}>
      {Object.values(movieDetails)?.map((movie) => (
        <div 
          className={style.card}
          key={movie.id} 
          onClick={()=>navigate(`/movies/${movie.id}`,{
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
            className={style.cardImg}
            src={`${import.meta.env.VITE_TMDB_IMG_URL}${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={style.cardTitle}>{movie.title}</div>
          <div className={style.cardReleaseDate}>{movie.release_date}</div>
        </div>
      ))}
    </div>
  );
}