import React from 'react';
import style from './Login.module.css';
import {Button} from '../../components';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../../utils/validate';

export const Login = () => {

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin
  } );

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('폼 데이터 제출');
    console.log({ email: login.values.email, password: login.values.password });
  }

  return (
    <div className={style.loginContianer}>
      <h1>로그인</h1>
      <form onSubmit={onSubmit} className={style.form}>
        <input 
          type="email"
          placeholder="이메일을 입력해주세요"
          {...login.getTextInputProps('email')}
          className={`${style.input} ${login.touched.email && login.errors.email ? style.errorInput : ''}`}
        />
        {login.touched.email && login.errors.email && <p className={style.errorMessage}>{login.errors.email}</p>}
        <input 
          type={'password'} 
          placeholder="비밀번호를 입력해주세요"
          {...login.getTextInputProps('password')}
          className={`${style.input} ${login.touched.password && login.errors.password ? style.errorInput : ''}`}
        />
        {login.touched.password && login.errors.password && <p className={style.errorMessage}>{login.errors.password}</p>}
        <Button 
          color='pink'
          shape='block'
          className={style.submitBtn}
          type="submit" 
          disabled={!login.values.email||!login.values.password||login.errors.email||login.errors.password}
        >
          로그인
        </Button>
      </form>
    </div>
  );
};


// import React from "react";
// import style from './Login.module.css';
// import {useForm} from 'react-hook-form'
// import * as yup from 'yup'
// import {yupResolver} from '@hookform/resolvers/yup'

// export const Login = () => {
//   const schema = yup.object().shape({
//     email: yup.string()
//       .required('이메일을 반드시 입력해주세요.')
//       .matches(/\S+@\S+\.\S+/,'이메일 형식에 맞지 않습니다.'),
//     password: yup.string()
//       .required('비밀번호를 입력해주세요.')
//       .min(8, '비밀번호는 8자 이상 입력해주세요.')
//       .max(16, '비밀번호는 16자 이하로 입력해주세요.')
//   })

//   const {register, handleSubmit, formState: {isSubmitting, isSubmitted, isValid, errors}} = useForm({
//     resolver: yupResolver(schema),
//     mode: "onChange",
//   });

//   const onSubmit = (data) => {
//     console.log('폼 데이터 제출')
//     console.log(data);
//   }

//   return (
//     <div className={style.loginContianer}>
//       <h1>로그인</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input 
//           type={'email'} 
//           placeholder="이메일을 입력해주세요"
//           aria-invalid={
//             isSubmitted ? (errors.email ? "true" : "false") : undefined
//           }
//           {...register("email")}
//         />
//         <p style={{color: 'red'}}>{errors.email?.message}</p>
//         <input 
//           type={'password'} 
//           placeholder="비밀번호를 입력해주세요"
//           aria-invalid={
//             isSubmitted ? (errors.password ? "true" : "false") : undefined
//           }
//           {...register("password")}
//         />
//         <p style={{color: 'red'}}>{errors.password?.message}</p>
//         <button type="submit" disabled={!isValid || isSubmitting}>로그인</button>
//       </form>
//     </div>
//   );
// };