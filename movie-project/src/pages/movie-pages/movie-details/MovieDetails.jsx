import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useCustomFetchMovie from "../../../hooks/useCustomFetchMovie";
import defaultProfile from '../../../assets/img/movie/cast/profile_null.jpg'
import * as S from './MovieDetails.styles'
import { Error, Loading } from "../../../components";

export const MovieDetails = () => {
  const { movieId } = useParams();;
  const {data: credit, isLoading, isError} = useCustomFetchMovie(`/movie/${movieId}/credits?language=ko`);
  const location = useLocation();
  const { title, backdrop_path, vote_average, overview, release_year, tagline, runtime } = location.state || {};

  // console.log(credit?.cast);

  if (isLoading){
    return <Loading message="로딩 중입니다." />;
  }

  if(isError){
    return <Error message="카테고리를 찾을 수 없습니다." />;
  }

  return (
    <S.Container>
      <S.Main backgroundimage={`${import.meta.env.VITE_TMDB_IMG_URL}${backdrop_path}`}>
        <S.MainTitle>{title}</S.MainTitle>
        {vote_average && <S.Vote>▪ 평균 {vote_average}</S.Vote>}
        {release_year && <S.Release>▪ {release_year}</S.Release>}
        {runtime && <S.Runtime>▪ {runtime}분</S.Runtime>}
        <S.Tagline>{tagline}</S.Tagline>
        <S.Overview>{overview}</S.Overview>
      </S.Main>
      <S.CreditTitle>감독/출연</S.CreditTitle>
      <S.CreditInner>
        {credit?.cast.map((cast, index) => (
          <S.Cast key={`${cast.id}-${index}`}>
            <S.CastImg
              src={cast.profile_path ? `${import.meta.env.VITE_TMDB_IMG_URL}${cast.profile_path}` : defaultProfile}
              alt={cast.name}
            />
            <S.CastName>{cast.original_name}</S.CastName>
            <S.CastRole>{cast.character} ({cast.known_for_department})</S.CastRole>
          </S.Cast>
        ))}
      </S.CreditInner>
    </S.Container>
  );
}