import { movieApi } from "../../api/apiClient";
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

const useFetchMovies = (category, page=1, pagenation=false) => {
  if(pagenation){
    const { data, isLoading, isError, isFetching } = useQuery({
      queryKey: ['fetchMovies', category, page],
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
  }
  else{
    const {data, isLoading, isError, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
      queryKey: ['fetchMovies', category],
      queryFn: async ({ pageParam = 1 }) => {
        const url = `/movie/${category}?language=ko&page=${pageParam}&region=KR`;
        const response = await movieApi.get(url);
        return response.data;
      },
      enabled: !!category, // category 있을때만 요청 가능하게
      staleTime: 1000 * 60 * 5,  // 5분동안 캐싱
      getNextPageParam: (lastPage) => { // lastPage는 queryFn이 가장 최근에 호출한 데이터
        const nextPage = lastPage.page + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
    })
    return {
      data,
      isLoading,
      isError,
      fetchNextPage,
      isFetchingNextPage,
    };
  }
};

export default useFetchMovies;
