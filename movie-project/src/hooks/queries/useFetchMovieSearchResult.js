import { movieApi } from "../../api/apiClient";
import { useQuery } from '@tanstack/react-query';

const useFetchMovieSearchResult = (searchVal, page) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['MovieSearchResult', searchVal, page],
    queryFn: async () => {
      const url = `/search/movie?query=${encodeURIComponent(searchVal)}&include_adult=false&language=ko&page=${page}&region=KR`;
      const response = await movieApi.get(url);
      return response.data;
    },
    enabled: !!searchVal && !!page, 
    staleTime: 1000 * 60, 
  });

  return {
    data,
    isLoading,
    isError,
    isFetching,
  };
};

export default useFetchMovieSearchResult;
