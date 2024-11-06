import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../api/endpoints/user';

const useFetchUserData = () => {
  const accessToken = localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['fetchUser'],  
    queryFn: fetchUser,  
    enabled: !!accessToken,
    staleTime: 1000 * 60
  });
};

export default useFetchUserData;