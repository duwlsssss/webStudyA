import styled from 'styled-components';
import { BeatLoader } from "react-spinners";

export const LoadingMessage = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  text-align: center;
  color: var(--color-pink);
  font-size: var(--font-medium);
`;

export const LoadingIcon = styled(BeatLoader)`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -55%);
`;