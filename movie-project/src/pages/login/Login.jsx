// import React from 'react';
// import style from './Login.module.css';
// import {Button} from '../../components';
// import useForm from '../../hooks/useForm';
// import {validateLogin} from '../../../utils/validate';

// export const Login = () => {

//   const login = useForm({
//     initialValue: {email: '', password: '', passwordCheck: ''},
//     validate: validateLogin
//   } );

//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log('폼 데이터 제출');
//     console.log({ email: login.values.email, password: login.values.password });
//   }

//   return (
//     <div className={style.loginContianer}>
//       <h1>로그인</h1>
//       <form onSubmit={onSubmit} className={style.form}>
//         <input 
//           type="email"
//           placeholder="이메일을 입력해주세요"
//           {...login.getTextInputProps('email')}
//           className={`${style.input} ${login.touched.email && login.errors.email ? style.errorInput : ''}`}
//         />
//         {login.touched.email && login.errors.email && <p className={style.errorMessage}>{login.errors.email}</p>}
//         <input 
//           type={'password'} 
//           placeholder="비밀번호를 입력해주세요"
//           {...login.getTextInputProps('password')}
//           className={`${style.input} ${login.touched.password && login.errors.password ? style.errorInput : ''}`}
//         />
//         {login.touched.password && login.errors.password && <p className={style.errorMessage}>{login.errors.password}</p>}
//         <input 
//           type={'password'} 
//           placeholder="비밀번호를 다시 입력해주세요"
//           {...login.getTextInputProps('passwordCheck')}
//           className={`${style.input} ${login.touched.passwordCheck && login.errors.passwordCheck ? style.errorInput : ''}`}
//         />
//         {login.touched.passwordCheck && login.errors.passwordCheck && <p className={style.errorMessage}>{login.errors.passwordCheck}</p>}
//         <Button 
//           color='pink'
//           shape='block'
//           className={style.submitBtn}
//           type="submit" 
//           disabled={!login.values.email||!login.values.password||!login.values.passwordCheck||login.errors.email||login.errors.password||login.errors.passwordCheck}
//         >
//           로그인
//         </Button>
//       </form>
//     </div>
//   );
// };


import React from "react";
import style from './Login.module.css';
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button} from '../../components';
import { Userlogin } from "../../api/endpoints/auth";
import { useNavigate } from "react-router-dom";
import {useUserAuthValue,useUserAuthAction} from '../../contexts/AuthContext';
import {fetchUser} from '../../api/endpoints/user';

export const Login = () => {
  const schema = yup.object().shape({
    email: yup.string()
      .required('이메일을 반드시 입력해주세요.')
      .matches(/\S+@\S+\.\S+/,'이메일 형식에 맞지 않습니다.'),
    password: yup.string()
      .required('비밀번호를 반드시 입력해주세요.')
      .min(8, '비밀번호는 8자 이상 입력해주세요.')
      .max(16, '비밀번호는 16자 이하로 입력해주세요.'),
  })

  const {register, handleSubmit, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });


  const navigate = useNavigate();
  const {login} = useUserAuthAction();

  const handleLogin = async (data) => {
    try {
      const response = await Userlogin(data);
      // console.log(response);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      const userData = await fetchUser();
      // console.log('Fetched user data:', userData);
      login({
        ...userData,
        refreshToken: response.refreshToken,
        accessToken: response.accessToken,
      });

      navigate('/'); // 로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error('로그인 실패:', error.message);
    }
  };

  return (
    <div className={style.loginContianer}>
      <h1>로그인</h1>
      <form className={style.form} onSubmit={handleSubmit(handleLogin)}>
        <input 
          className={`${style.input} ${errors.email ? style.errorInput : ''}`}
          type={'email'} 
          placeholder={"이메일을 입력해주세요"}
          {...register("email")}
        />
        <p className={style.errorMessage}>{errors.email?.message}</p>
        <input 
          className={`${style.input} ${errors.password ? style.errorInput : ''}`}
          type={'password'} 
          placeholder={"비밀번호를 입력해주세요"}
          {...register("password")}
        />
        <p className={style.errorMessage}>{errors.password?.message}</p>
        <Button 
          color='pink'
          shape='block'
          className={style.submitBtn}
          type="submit" 
          disabled={!isDirty || !isValid || isSubmitting}
        >
          로그인
        </Button>
      </form>
    </div>
  );
};