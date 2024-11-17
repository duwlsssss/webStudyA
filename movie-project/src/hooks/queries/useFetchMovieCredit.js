import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../../api/apiClient';

const useFetchMovieCredit = (movieId) => {
  const {data, isLoagind, isError} = useQuery({
    queryKey: ['movieCredit', movieId],
    queryFn: async () => {
      const response = await movieApi.get(`/movie/${movieId}/credits?language=ko`);
      return response.data;
    },
    enabled: !!movieId, 
    staleTime: 1000 * 60, 
  });

  return {data, isLoagind, isError};
};

export default useFetchMovieCredit;
