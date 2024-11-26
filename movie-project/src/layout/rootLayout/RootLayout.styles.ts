import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  min-height: 100vh; /* 화면 전체 높이 사용 */
`;

export const OutletContainer = styled.div`
  flex: 1; /* 남은 공간을 Outlet이 차지하도록 설정 */
  padding: 2rem;
  position: relative;
`;
