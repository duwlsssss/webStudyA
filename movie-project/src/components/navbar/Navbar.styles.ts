import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.div`
  background-color: var(--color-dark-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;

export const NavRight = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  @media (max-width: 300px) {
    font-size: var(--font-xsmall);
    margin-left: 0.1rem;
    gap: 0.2rem;
  }
`;

export const TextLogo = styled(Link)`
  color: var(--color-pink);
  font-weight: 700;
  text-decoration: none;

  @media (max-width: 300px) {
    display: none; /* 작은 화면에서 텍스트 로고 숨김 */
  }
`;

export const IconLogo = styled(Link)`
  display: none;
  color: var(--color-pink);

  @media (max-width: 300px) {
    display: block; /* 작은 화면에서 아이콘 로고 표시 */
  }
`;

export const Username = styled.div`
  font-weight: 700;
  color: var(--color-white);
`;
