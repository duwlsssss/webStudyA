import { axiosInstance } from "/src/api/axiosInstance.js"
import { useEffect,useState } from "react";
export const useCustomFetch = (url) => {
    const [data,setData] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(false);

    useEffect(()=>{
      const fetchData = async ()=>{
        setIsLoading(true);
        setIsError(false);
        try{
          const res = await axiosInstance.get(`${url}`);
          setData(res.data);
        } catch(e){
          console.log(`데이터 가져오다 문제 생김 endPoint: ${url}`, e);
          setIsError(true);
        } finally{
          setIsLoading(false);
        }
      };
      fetchData();
    },[url]);

    // useEffect(()=>{
    //   console.log(data);
    // },[data]);

    return [data, isLoading, isError];
}