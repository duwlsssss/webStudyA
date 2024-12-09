import styled from "styled-components";

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
`;

export const Card = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

export const CardImg = styled.img`
  width: 100%;
  aspect-ratio: 2 / 1;
  object-fit: cover;
  border-radius: var(--border-radius-medium);
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(50%);
  }
`;

export const CardLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.4rem;
  border-radius: var(--border-radius-small);
  font-size: 0.8rem;
  color: var(--color-white);
`;
