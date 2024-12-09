import { useParams, useLocation } from "react-router-dom";
import useFetchMovieCredit from "../../../hooks/queries/useFetchMovieCredit";
import defaultProfile from '../../../assets/img/movie/cast/profile_null.jpg'
import * as S from './MovieDetails.styles'
import { Error, Loading } from "../../../components";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const {data: credit, isLoading, isError} = useFetchMovieCredit(Number(movieId));
  const { state } = useLocation();
  const { movie } = state || {};

  const getProfileImage = (path: string | null) =>
    path ? `${import.meta.env.VITE_TMDB_IMG_URL}${path}` : defaultProfile;
 
  if (isLoading) return <Loading message="영화 정보를 가져오는 중입니다." />;
  if (isError || !movie) return <Error message="영화 정보를 찾을 수 없습니다." />;

  return (
    <S.Container>
      <S.Main $backgroundimage={`${import.meta.env.VITE_TMDB_IMG_URL}${movie.backdrop_path}`}>
        <S.MainTitle>{movie.title}</S.MainTitle>
        {movie.vote_average && <S.Vote>▪ 평균 {movie.vote_average}</S.Vote>}
        {movie.release_year && <S.Release>▪ {movie.release_year}</S.Release>}
        {movie.runtime && <S.Runtime>▪ {movie.runtime}분</S.Runtime>}
        <S.Tagline>{movie.tagline}</S.Tagline>
        <S.Overview>{movie.overview}</S.Overview>
      </S.Main>
      <S.CreditTitle>감독/출연</S.CreditTitle>
      <S.CreditInner>
        {credit?.cast.map((cast) => (
          <S.Cast key={`${cast.id}`}>
            <S.CastImg
              src={getProfileImage(cast.profile_path)}
              alt={cast.name}
            />
            <S.CastName>{cast.original_name}</S.CastName>
            <S.CastRole>{cast.character} ({cast.known_for_department || '알 수 없음'})</S.CastRole>
          </S.Cast>
        ))}
      </S.CreditInner>
    </S.Container>
  );
}