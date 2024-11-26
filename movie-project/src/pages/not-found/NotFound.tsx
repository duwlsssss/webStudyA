import * as S from './NotFound.styles';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {

  const navigate = useNavigate();

  const handleToHome = () => {
    navigate('/', { replace: true }); // 홈으로 이동하면서 히스토리 스택을 덮어씀
  }

  return (
    <S.Container>
      <S.Inner>
        <S.Title>PAGE NOT FOUND</S.Title>
        <S.Description>
          페이지의 주소가 잘못 입력되었거나,<br />
          요청하신 페이지의 주소가 변경 혹은 삭제되어 찾을 수 없습니다.
        </S.Description>
        <S.HomeButton 
          color="white" 
          shape="line"
          onClick={handleToHome}
        >
          홈으로
        </S.HomeButton>
      </S.Inner>
    </S.Container>
  )
};
