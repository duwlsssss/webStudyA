import styled from 'styled-components';
import {Button} from '../../components';

export const SignupContainer = styled.div`
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
  border: 1px solid var(--color-dark-gray);

  &.error {
    outline: 2px solid var(--color-pink);
  }
`;

export const GenderContainer = styled.div`
  margin: 0.9rem 0 0.4rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const GenderInput = styled.input`
  -webkit-appearance: none; /* 웹킷 브라우저에서 기본 스타일 제거 */
  -moz-appearance: none; /* 모질라 브라우저에서 기본 스타일 제거 */
  appearance: none; /* 기본 브라우저에서 기본 스타일 제거 */
  width: 13px;
  height: 13px;
  border: 1px solid var(--color-dark-gray);
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:checked {
    border: 3px solid var(--color-white);
    background-color: transparent;
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