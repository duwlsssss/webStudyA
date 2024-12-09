import styled, {keyframes} from "styled-components";

const Skeleton = keyframes`
  0% {
    opacity: 1;
  }
  30% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  } 
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CardMain = styled.div`
  width: 100%;
  height: 180px;
  background: var(--color-gray);
  border-radius: var(--border-radius-small);
  animation: ${Skeleton} 1.5s infinite ease-in-out;
`;

export const TitleBox = styled.div`
  width: 100%;
  height: 28px;
  background: var(--color-gray);
  border-radius: var(--border-radius-small);
  animation: ${Skeleton} 1.5s infinite ease-in-out;
`;

export const DescriptionBox = styled.div`
  width: 100%;
  height: 12px;
  background: var(--color-gray);
  border-radius: var(--border-radius-small);
  animation: ${Skeleton} 1.5s infinite ease-in-out;
`;
