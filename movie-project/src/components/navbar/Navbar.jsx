import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { Button } from '../button/Button';
import * as S from './Navbar.styles';
import { fetchUser } from "../../api/endpoints/user";
import {useUserAuthValue,useUserAuthAction} from '../../contexts/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();

  const user = useUserAuthValue();
  const {login,logout} = useUserAuthAction();

  // 로그아웃 함수
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const loadUser = async () => {
      const accessToken = localStorage.getItem('accessToken');
      //페이지 처음 로드시 localStorage에 accessToken이 있으면 그 유저 정보 불러와 사용
      if (!user && accessToken){  
        try {
          const userData = await fetchUser();
          console.log("유저 정보 업데이트:", userData);
          login(userData);
        } catch (error) {
          console.error("유저 정보를 불러오는 중 오류 발생:", error);
        }
      }
    };

    loadUser();
  }, [user, login]);


  return (
    <S.NavbarContainer>
      <S.TextLogo to="/">YOUNGCHA</S.TextLogo>
      <S.IconLogo to="/">
        <MdLocalMovies size={25} />
      </S.IconLogo>
      <S.NavRight>
        {user ? (
          <>
            <S.Username>{user.email.split('@')[0]} 님</S.Username>
            <Button
              color='pink'
              shape='block'
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button
              color='pink'
              shape='block'
              onClick={() => navigate(`/login`, { replace: false })}
            >
              로그인
            </Button>
            <Button
              color='gray'
              shape='block'
              onClick={() => navigate(`/signup`, { replace: false })}
            >
              회원가입
            </Button>
          </>
        )}
      </S.NavRight>
    </S.NavbarContainer>
  );
};

