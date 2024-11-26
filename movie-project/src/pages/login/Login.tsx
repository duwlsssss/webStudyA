import * as S from './Login.styles'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useLogin from '../../hooks/mutation/useLogin'
import { TLoginData } from '../../types/auth'

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

  const loginMutation = useLogin();

  const handleLogin = (data: TLoginData) => {
    loginMutation.mutate(data); 
  };

  return (
    <S.LoginContainer>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={handleSubmit(handleLogin)}>
        <S.Input
          className={errors.email ? "error" : ""}
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
        />
        <S.ErrorMessage>{errors.email?.message}</S.ErrorMessage>

        <S.Input
          className={errors.password ? "error" : ""}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
        />
        <S.ErrorMessage>{errors.password?.message}</S.ErrorMessage>

        <S.SubmitButton
          color="pink"
          shape="block"
          disabled={!isDirty || !isValid || isSubmitting}
        >
          로그인
        </S.SubmitButton>
      </S.Form>
      <S.ToSignUp to={'/signUp'}>회원 가입이 되어있지 않으신가요?</S.ToSignUp>
    </S.LoginContainer>
  );
};