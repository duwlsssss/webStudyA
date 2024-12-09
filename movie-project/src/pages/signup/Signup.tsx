import * as S from "./Signup.styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useRegister from '../../hooks/mutation/useRegister'
import { TRegisterData } from '../../types/auth'

export const SignUp = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(/\S+@\S+\.\S+/, "이메일 형식에 맞지 않습니다.")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상 입력해주세요.")
      .max(16, "비밀번호는 16자 이하로 입력해주세요.")
      .required("비밀번호를 반드시 입력해주세요."),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호를 반드시 다시 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm<TRegisterData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const registerMutation = useRegister();

  const handleRegisterUser = (data: TRegisterData) => {
    const userData = {
      email: data.email,
      password: data.password,
      passwordCheck: data.passwordCheck,
    };

    registerMutation.mutate(userData);
  };

  return (
    <S.SignupContainer>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={handleSubmit(handleRegisterUser)}>
        <S.Input
          className={errors.email ? "error" : ""}
          type='email'
          placeholder='이메일을 입력해주세요'
          {...register("email")}
        />
        <S.ErrorMessage>{errors.email?.message}</S.ErrorMessage>

        <S.Input
          className={errors.password ? "error" : ""}
          type='password'
          placeholder='비밀번호를 입력해주세요'
          {...register("password")}
        />
        <S.ErrorMessage>{errors.password?.message}</S.ErrorMessage>

        <S.Input
          className={errors.passwordCheck ? "error" : ""}
          type='password'
          placeholder='비밀번호를 다시 입력해주세요'
          {...register("passwordCheck")}
        />
        <S.ErrorMessage>{errors.passwordCheck?.message}</S.ErrorMessage>
        <S.SubmitButton disabled={!isDirty || !isValid || isSubmitting}>
          회원가입
        </S.SubmitButton>
      </S.Form>
    </S.SignupContainer>
  );
};
