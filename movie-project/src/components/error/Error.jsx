import React from 'react';
import * as S from './Error.styles';

export const Error = ({ message }) => {
  return <S.ErrorMessage>{message}</S.ErrorMessage>;
};
