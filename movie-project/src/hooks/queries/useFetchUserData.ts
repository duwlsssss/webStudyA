import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '../../api/endpoints/user'
import { TUserData } from '../../types/user'

const useFetchUserData = () => {
  const accessToken = localStorage.getItem('accessToken');

  const {data, isLoading, isError} = useQuery<TUserData>({
    queryKey: ['fetchUser'],  
    queryFn: fetchUser,  
    enabled: !!accessToken,
  });

  return {data, isLoading, isError};
};

export default useFetchUserData;