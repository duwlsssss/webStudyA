import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../../api/apiClient';

const useFetchMovieDetails = (movieId) => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['movieId', movieId],
    queryFn: async () => {
      const response = await movieApi.get(`/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_TOKEN}&language=ko`);
      return response.data;
    },
    enabled: !!movieId,  // movieId가 주어졌을때만 정보 가져옴
    staleTime: 1000 * 60,  // 1분동안 캐싱
  });

  return {data, isLoading, isError};
};

export default useFetchMovieDetails;
