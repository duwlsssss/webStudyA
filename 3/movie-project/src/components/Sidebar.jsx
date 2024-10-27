import React from "react";
import {Link} from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { PiFilmSlate } from "react-icons/pi";
import styled from 'styled-components';

const StyledSide = styled.div`
  background-color: #404040;
  padding: 1rem 2rem;
`;

const StyledLink = styled(Link)`
  display: block;
  margin: 0 auto 1rem;
  color: white;
  font-weight: bold;
  text-decoration: none;
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }
`;

const Navbar = () => {
  return (
    <StyledSide>
      <StyledLink to='/search'>
        <div><IoSearch size={25}/> 찾기</div>
      </StyledLink>
      <StyledLink to='/category'>
        <div><PiFilmSlate size={25}/> 영화</div>
      </StyledLink>
    </StyledSide>
  );
};

export default Navbar;
