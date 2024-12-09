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
  transition: transform 0.3s ease;

  &:hover{
    transform: scale(1.05);
  }
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: var(--font-small);
  margin: 0.5rem 0;
  overflow: hidden;
  white-space: nowrap;  
  text-overflow: ellipsis;
`;

export const CardReleaseDate = styled.div`
  font-size: var(--font-xsmall);
`;