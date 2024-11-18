import styled from 'styled-components'

const StyledInput = styled.input` 
  width: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 0.5rem;

  &::placeholder {
    font-style: italic;
    color: #a3a3a3;
  }
`;

const Input = ({ className, value, onChange, placeholder, onBlur, onKeyDown }) =>{
  return (
    <StyledInput
      type="text"
      className={className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  );
}

export default Input;