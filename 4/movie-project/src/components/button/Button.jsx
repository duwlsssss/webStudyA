import React from "react";
import { useNavigate } from "react-router-dom";
import style from './Button.module.css';


export const LoginBtn = () => {
  const navigate = useNavigate();
  return (
    <div 
      className={`${style.btn} ${style.loginBtn}`}
      onClick={()=>navigate(`/login`,{
        replace: false,
      })}
    >
      로그인
    </div>
  );
};

export const SignUpBtn = () => {
  const navigate = useNavigate();
  return (
    <div 
      className={`${style.btn} ${style.signupBtn}`}
      onClick={()=>navigate(`/signup`,{
        replace: false,
      })}
    >
      회원가입
    </div>
  );
};

