import * as S from './Loading.styles';

export const Loading = ({ message }:{message:string}) => {
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
