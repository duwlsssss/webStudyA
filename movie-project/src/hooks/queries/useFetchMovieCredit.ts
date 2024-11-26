import { useQuery } from "@tanstack/react-query";
import { movieApi } from "../../api/apiClient.ts";
import { TMovieCredit } from "../../types/movie.ts";

const useFetchMovieCredit = (movieId: number) => {
  const { data, isLoading, isError } = useQuery<TMovieCredit>({
    queryKey: ["movieCredit", movieId],
    queryFn: async () => {
      const response = await movieApi.get(
        `/movie/${movieId}/credits?language=ko`
      );
      return response.data;
    },
    enabled: !!movieId,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError };
};

export default useFetchMovieCredit;
