import React from 'react';
import * as S from './Loading.styles';

export const Loading = ({ message }) => {
  return <S.LoadingMessage>{message}</S.LoadingMessage>;
};
