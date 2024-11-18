import styled from 'styled-components'

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid #000;
  padding: 0.5rem;

  &:hover {
    background-color: #949494;
  }

  &:disabled {
    cursor: default;
    background-color: #999;
  }
`;

const Button = ({text, onClick, className, disabled=false}) => {
  return (
    <StyledButton onClick={onClick} className={className} disabled={disabled}>
      {text}
    </StyledButton>
  )
}

export default Button;