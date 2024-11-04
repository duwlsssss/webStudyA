import React from "react"
import * as S from './CardSkeleton.styles';

export const CardSkeleton = () => {
  return (
    <S.Container>
      <S.CardMain/>
      <S.TitleBox/>
      <S.DescriptionBox/>
    </S.Container>
  )
}