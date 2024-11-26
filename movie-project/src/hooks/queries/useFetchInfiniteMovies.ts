import { useInfiniteQuery } from "@tanstack/react-query";
import { movieApi } from "../../api/apiClient";
import { TMovieCategory, TMoviesResponse } from "../../types/movie";

const useFetchInfiniteMovies = (category: TMovieCategory) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["movies", category],
    queryFn: async ({ pageParam }: { pageParam: number }): Promise<TMoviesResponse> => {
      const response = await movieApi.get(`/movie/${category}`, {
        params: {
          language: 'ko',
          page: pageParam,
          region: 'KR'
        }
      });
      return response.data;
    },
    initialPageParam: 1,
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage: TMoviesResponse) => {
      if (lastPage.page >= lastPage.total_pages) return undefined;
      return lastPage.page + 1;
    },
  });

  return {data, isLoading, isError, fetchNextPage, isFetchingNextPage};
};

export default useFetchInfiniteMovies;