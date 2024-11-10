import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { Button } from '../button/Button';
import * as S from './Navbar.styles';
import useFetchUserData from '../../hooks/queries/useFetchUserData';
import { useQueryClient } from '@tanstack/react-query';

export const Navbar = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useFetchUserData(); 

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('토큰 삭제됨');
    queryClient.setQueryData(['fetchUser'], null); 
    navigate('/login');
  };

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

