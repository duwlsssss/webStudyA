import styled from "styled-components";
import {Link} from "react-router-dom";

export const SidebarContainer = styled.div`
  background-color: var(--color-dark-gray);
  padding: 1rem 2rem;
`;

export const SidebarLink = styled(Link)`
  display: block;
  margin: 0 auto 1rem;
  color: var(--color-white);
  font-weight: 700;
  text-decoration: none;
`;

export const SidebarLinkInner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover{
    color: var(--color-pink);
  }
`;

