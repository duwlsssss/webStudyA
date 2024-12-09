import * as S from './Button.styles';

type TButtonProps = {
  className?: string, 
  color?: string, 
  shape?: string, 
  onClick?: () => void, 
  children?: React.ReactNode,
  disabled?: boolean,
}

export function Button({  
  className='', 
  color = 'pink', 
  shape = 'block', 
  onClick, 
  children, 
  disabled = false,
}: TButtonProps){
  return (
    <S.StyledButton
      className={className}
      data-color={color}
      data-shape={shape}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </S.StyledButton>
  );
};
