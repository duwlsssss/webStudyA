import styled from "styled-components";

export const Card = styled.div`
  width: 120px;
  height: auto;
  cursor: pointer;
  text-align: center;
  justify-self: center;
`;

export const CardImg = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: var(--border-radius-small);
  transition: filter 0.3s ease;

  &:hover{
    filter: brightness(0.5);
  }
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: var(--font-small);
  margin: 0.5rem 0;
  word-break: keep-all;
`;

export const CardReleaseDate = styled.div`
  font-size: var(--font-xsmall);
`;