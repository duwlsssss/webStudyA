import { movieApi } from "../../api/apiClient.ts";
import { useQuery } from "@tanstack/react-query";
import { TMoviesResponse } from "../../types/movie";

const useFetchMovieSearchResult = (searchVal: string, page: number) => {
  const { data, isLoading, isError, isFetching } = useQuery<TMoviesResponse>({
    queryKey: ["MovieSearchResult", searchVal, page],
    queryFn: async (): Promise<TMoviesResponse> => {
      const url = `/search/movie?query=${encodeURIComponent(
        searchVal
      )}&include_adult=false&language=ko&page=${page}&region=KR`;
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




