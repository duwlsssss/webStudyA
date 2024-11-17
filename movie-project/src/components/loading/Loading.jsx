import React from 'react';
import * as S from './Loading.styles';

export const Loading = ({ message }) => {
  return(
     <>
        <S.LoadingMessage>{message}</S.LoadingMessage>
        <S.LoadingIcon
          color='var(--color-pink)'
          margin={5}
          size={10}
          speedMultiplier={0.5}
        />
     </>
  );
};
