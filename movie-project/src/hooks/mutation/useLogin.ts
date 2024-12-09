import { useMutation } from '@tanstack/react-query'
import { fetchUser } from '../../api/endpoints/user'
import { userlogin } from '../../api/endpoints/auth'
import { useNavigate } from 'react-router-dom'
import { queryClient } from '../../App'
import { TTokens } from '../../types/user'

 const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userlogin, 
    onSuccess: async (response: TTokens) => {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      // user data를 refetch하고 cache함
      // ProtectedRoute에 user 데이터를 즉시 반영해야해 이거 사용
      await queryClient.fetchQuery({ queryKey: ['fetchUser'], queryFn: fetchUser });
      // await queryClient.invalidateQueries(['fetchUser']); //이건 다음 렌더링 시점까지 데이터를 다시 가져오지 않음
      
      // 홈으로 이동
      navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패:', error.message);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export default useLogin;