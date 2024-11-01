import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const BaseButton = styled(Link)`
  padding: 0.5rem 0.8rem;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  white-space: nowrap;
`;

const LoginButton = styled(BaseButton)`
  &:hover {
    background-color: #333; 
  }
`;

const SignUpButton = styled(BaseButton)`
  background-color: #f00;
  &:hover {
    background-color: #c00;
  }
`;

export const LoginBtn = ({ to }) => {
  return <LoginButton to={to}>로그인</LoginButton>;
};

export const SignUpBtn = ({ to }) => {
  return <SignUpButton to={to}>회원가입</SignUpButton>;
};
