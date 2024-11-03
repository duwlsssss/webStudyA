import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: var(--border-radius-small);

  &[data-color='pink'][data-shape='block'] {
    background-color: var(--color-pink);
    color: var(--color-white);
  }

  &[data-color='pink'][data-shape='block']:hover {
    background-color: var(--color-pink-dark);
  }

  &[data-color='pink'][data-shape='block']:disabled {
    background-color: var(--color-dark-gray);
    pointer-events: none;
  }

  &[data-color='gray'][data-shape='block'] {
    background-color: var(--color-dark-gray);
    color: var(--color-white);
  }

  &[data-color='gray'][data-shape='block']:hover {
    background-color: var(--color-gray);
  }

  &[data-color='white'][data-shape='line'] {
    background-color: var(--color-white);
  }
  &[color='white'][shape='line']:hover {
    background-color: var(--color-dark-gray);
    color: var(--color-white);
  }
`;
