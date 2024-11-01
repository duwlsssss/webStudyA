import React from "react";
import style from './Signup.module.css';
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button} from '../../components';

export const SignUp = () => {
  const schema = yup.object().shape({
    email: yup.string()
      .required('이메일을 반드시 입력해주세요.')
      .matches(/\S+@\S+\.\S+/,'이메일 형식에 맞지 않습니다.'),
    password: yup.string()
      .required('비밀번호를 반드시 입력해주세요.')
      .min(8, '비밀번호는 8자 이상 입력해주세요.')
      .max(16, '비밀번호는 16자 이하로 입력해주세요.'),
    passwordCheck: yup.string()
      .required('비밀번호를 반드시 다시 입력해주세요.') 
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
    birthday: yup.string().required('생일을 입력해주세요.'), 
    gender: yup.string().required('성별을 선택해주세요.'),
  })

  const {register, handleSubmit, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log('폼 데이터 제출')
    console.log(data);
  }

  return (
    <div className={style.loginContianer}>
      <h1>회원가입</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
        <input 
          className={`${style.input} ${errors.passwordCheck ? style.errorInput : ''}`}
          type={'password'} 
          placeholder={"비밀번호를 다시 입력해주세요"}
          {...register("passwordCheck")}
        />
        <p className={style.errorMessage}>{errors.passwordCheck?.message}</p>
        <input 
          className={`${style.input} ${errors.birthday ? style.errorInput : ''}`}
          type={'date'} 
          {...register("birthday")}
        />
        <p className={style.errorMessage}>{errors.birthday?.message}</p>
        <div className={style.genderContainer}>
          <label>
            <input 
              className={style.genderInput}
              type={"radio"} 
              value={"male"} 
              {...register("gender")} 
            />
            남성
          </label>
          <label>
            <input 
              className={style.genderInput}
              type={"radio"} 
              value={"female"} 
              {...register("gender")} 
            />
            여성
          </label>
        </div>
        <p className={style.errorMessage}>{errors.gender?.message}</p>
        <Button 
          color='pink'
          shape='block'
          className={style.submitBtn}
          type="submit" 
          disabled={!isDirty || !isValid || isSubmitting}
        >
          회원가입
        </Button>
      </form>
    </div>
  );
};