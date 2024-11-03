import styled from "styled-components";
import { Button } from "../../components";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 2rem;
`;

export const Title = styled.h1`
  font-size: var(--font-large);
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  width: 60%;
  max-width: 500px;
  margin: 0 auto;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 0.7rem;
  padding: 0.7rem 0.5rem;
  border-radius: var(--border-radius-small);
  border: 1px solid #ccc;
  
  &.error {
    outline: 2px solid var(--color-pink);
  }
`;

export const ErrorMessage = styled.p`
  text-align: left;
  font-size: var(--font-small);
  color: var(--color-pink);
  margin-top: 0.5rem;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.7rem 0.5rem;
`;


export const ToSignUp = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  font-size: var(--font-xsmall);
  color: var(--color-pink);
  text-decoration: none;
  cursor: pointer;

  &:hover{
    text-decoration: underline;
  }
`;
