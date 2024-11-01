import React from "react";
import {Link} from "react-router-dom";
import { LoginBtn, SignUpBtn } from "./Button";
import { MdLocalMovies } from "react-icons/md";
import styled from 'styled-components';

const StyledNav = styled.div`
  background-color: #404040;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`

const RightNav = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end; 
  gap: 1rem;

  @media (max-width: 300px) {
    font-size: 0.8rem;
    margin-left: 0.1rem;
    gap: 0.2rem;
  }
`
const StyledLink = styled(Link)`
  color: red;
  font-weight: bold;
  text-decoration: none;

  @media (max-width: 300px) {
    display: none; /* YOUNGCHA 없앰 */ 
  }
`
const IconLink = styled(Link)`
  display: none;
  color: red;

  @media (max-width: 300px) {
    display: block; /* 로고 표시 */
  }
`;

const Navbar = () => {
  return (
    <StyledNav>
      <StyledLink to={'/'}>YOUNGCHA</StyledLink>
      <IconLink to={'/'}>
        <MdLocalMovies size={25}/>
      </IconLink>
      <RightNav>
        <LoginBtn to={'/login'}/>
        <SignUpBtn to={'/signUp'}/>
      </RightNav>
    </StyledNav>
  );
};

export default Navbar;
