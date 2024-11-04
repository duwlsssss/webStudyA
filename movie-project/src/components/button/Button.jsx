import React from "react";
import * as S from './Button.styles';

export const Button = ({  
  className='', 
  color = 'pink', 
  shape = 'block', 
  cursor='pointer', 
  onClick, 
  children, 
  disabled = false,
  ...props 
}) => {
  return (
    <S.StyledButton
      className={className}
      data-color={color}
      data-shape={shape}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </S.StyledButton>
  );
};
