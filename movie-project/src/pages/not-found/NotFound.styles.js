import styled from "styled-components";
import { Button } from "../../components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Inner = styled.div`
  text-align: center;
  width: 80%;
`

export const Title = styled.div`
  font-size: var(--font-xlarge);
`;

export const Description = styled.div`
  margin: 1rem 0;
  line-height: 1.5;
  word-break: keep-all;
  color: var(--color-dark-gray);
`;

export const HomeButton = styled(Button)`
  padding: 0.5rem;
  font-size: var(--font-medium);
  border-radius: var(--border-radius-small);
`;
