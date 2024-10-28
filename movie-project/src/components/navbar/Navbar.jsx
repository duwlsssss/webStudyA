import React from "react";
import {Link} from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import style from './NAvbar.module.css'; 


export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={style.navbarContainer}>
      <Link className={style.textLogo} to={'/'}>YOUNGCHA</Link>
      <Link className={style.iconLogo} to={'/'}>
        <MdLocalMovies size={25}/>
      </Link>
      <div className={style.navRight}>
        <Button
          className={style.loginBtn}
          color='pink'
          shape='block'
          onClick={() => navigate(`/login`, { replace: false })}
        >
          로그인
        </Button>
        <Button
          className={style.signupBtn}
          color='gray'
          shape='block'
          onClick={() => navigate(`/signup`, { replace: false })}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

