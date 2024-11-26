import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../../api/endpoints/auth'
import { useNavigate } from 'react-router-dom'

 const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser, 
    onSuccess: async () => {
      navigate('/login');
    },

    onError: (error) => {
      console.error('회원 등록 실패 : ', error.message);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export default useRegister;