import * as S from './Error.styles';

export const Error = ({ message }: {message: string}) => {
  return <S.ErrorMessage>{message}</S.ErrorMessage>;
};
