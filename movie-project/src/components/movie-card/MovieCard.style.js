import styled from "styled-components";

export const Card = styled.div`
  width: 120px;
  height: auto;
  cursor: pointer;
  text-align: center;
  justify-self: center;

  .cardImg {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: var(--border-radius-small);
    transition: filter 0.3s ease;
  }
  
  .cardImg:hover {
    filter: brightness(0.5);
  }

  .cardTitle {
    font-weight: 700;
    font-size: 0.9rem;
    margin: 0.5rem 0;
    word-break: keep-all;
  }

  .cardReleaseDate {
    font-size: 0.7rem;
  }
`;