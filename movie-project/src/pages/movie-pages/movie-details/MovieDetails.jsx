import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useCustomFetchMovie from "../../../hooks/useCustomFetchMovie";
import defaultProfile from '../../../assets/img/movie/cast/profile_path_null.jpg'
import style from './MovieDetails.module.css'

export const MovieDetails = () => {
  const { movieId } = useParams();;
  const {data: credit, isLoading, isError} = useCustomFetchMovie(`/movie/${movieId}/credits?language=ko`);
  const location = useLocation();
  const { title, backdrop_path, vote_average, overview, release_year, tagline, runtime } = location.state || {};

  // console.log(credit?.cast);

  if(isError){
    return <div><h1>에러 발생</h1></div>
  }
  if(isLoading){
    return <div><h1>로딩 중...</h1></div>
  }

  return (
    <div className={style.container}>
      <img className={style.mainImg} src={`${import.meta.env.VITE_TMDB_IMG_URL}${backdrop_path}`} alt={title}/>
      <div className={style.mainInner}>
        <div className={style.mainTitle}>{title}</div>
        {vote_average ? <div className={style.vote}>▪ 평균 {vote_average}</div> : null}
        {release_year ? <div className={style.release}>▪ {release_year}</div> : null}
        {runtime ? <div className={style.runtime}>▪ {runtime}분</div> : null}
        <div className={style.tagline}>{tagline}</div>
        <div className={style.overview}>{overview}</div>
      </div>
      <div className={style.creditTitle}>감독/출연</div>
      <div className={style.creditInner}>
        {credit?.cast.map((cast, index)=>(
            <div 
              className={style.cast}
              key={`${cast.id}-${index}`}  // 고유한 key 생성
            >
            <img 
              className={style.castImg}
              src={cast.profile_path 
                ? `${import.meta.env.VITE_TMDB_IMG_URL}${cast.profile_path}` 
                : defaultProfile} 
              alt={cast.name}
            />
            <div className={style.castName}>{cast.original_name}</div>
            <div className={style.castRole}>{cast.character} ({cast.known_for_department})</div>
          </div>
        ))}
      </div>
    </div>
  );
}