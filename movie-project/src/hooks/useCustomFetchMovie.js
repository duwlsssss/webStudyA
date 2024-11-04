import { useEffect, useState } from "react";
import { movieApi } from "../api/apiClient";

const useCustomFetchMovie = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return; // url이 null이면 요청을 하지 않음

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await movieApi.get(url);
        setData(res.data);
      } catch (e) {
        console.log(`영화 데이터 가져오다 문제 생김 endPoint: ${url}`, e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetchMovie;

