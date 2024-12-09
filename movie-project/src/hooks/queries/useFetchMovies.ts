import { movieApi } from "../../api/apiClient.ts";
import { useQuery } from "@tanstack/react-query";
import { TfetchMovieProps, TMoviesResponse } from "../../types/movie.ts";

const useFetchMovies = ({category, page = 1}: TfetchMovieProps) => {
  const { data, isLoading, isError, isFetching } = useQuery<TMoviesResponse>({
    queryKey: ["fetchMovies", category, page],
    queryFn: async () => {
      const url = `/movie/${category}?language=ko&page=${page}&region=KR`;
      const response = await movieApi.get(url);
      return response.data;
    },
    enabled: !!category && !!page,
    staleTime: 1000 * 60,
  });

  return {
    data,
    isLoading,
    isError,
    isFetching,
  };
};

export default useFetchMovies;