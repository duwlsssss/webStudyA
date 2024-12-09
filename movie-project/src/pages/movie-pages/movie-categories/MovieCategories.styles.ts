import styled from 'styled-components';

export const MoviesContainer= styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  position: relative;
  min-height: 400px;  /* 에러 메시지 중앙 정렬을 위한 최소 높이 설정 */
`;

export const ErrorMessage = styled.div`
  grid: 1/-1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  color: var(--color-pink);
`;