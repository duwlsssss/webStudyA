import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: var(--font-medium);
`;

export const Main = styled.div`
  border-radius: var(--border-radius-medium);
  width: 100%;
  height: 400px;
  padding: 2rem;
  background: url(${props => props.backgroundimage}) center / cover no-repeat;
`;

export const MainTitle = styled.div`
  font-size: var(--font-large);
  font-weight: 700;
  margin-bottom: 3%;
`;

export const Vote = styled.div`
  margin-bottom: 2%;
  font-size: var(--font-small);
`;

export const Release = styled.div`
  margin-bottom: 2%;
  font-size: var(--font-small);
`;

export const Runtime = styled.div`
  margin-bottom: 2%;
  font-size: var(--font-small);
`;

export const Tagline = styled.div`
  margin-bottom: 2%;
  font-size: var(--font-medium);

  @media (max-width: 500px) {
    display: none;
  }
`;

export const Overview = styled.div`
  margin-bottom: 2%;
  font-size: var(--font-small);
  line-height: 1.3;
  word-break: keep-all;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const CreditTitle = styled.div`
  font-weight: 500;
`;

export const CreditInner = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

export const Cast = styled.div`
  text-align: center;
  justify-self: center;
  width: 120px;
`;

export const CastImg = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--color-white);
  transition: border 0.3s ease;

  &:hover {
    border: 3px solid var(--color-pink);
  }
`;

export const CastName = styled.div`
  margin: 0.5rem 0;
  font-size: var(--font-small);
`;

export const CastRole = styled.div`
  font-size: var(--font-xsmall);
  color: var(--color-dark-gray);
`;