import styled from 'styled-components';
import { Button } from '../../components';

export const MoviesContainer= styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

export const BtnContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 125px; 
  width: calc(100% - 125px); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: rgb(0,0,0,0.6);
  border-radius: var(--border-radius-medium)
`;

export const PrevBtn= styled(Button)`
`;

export const NextBtn= styled(Button)`
`;

export const PageDesc= styled.span`
  margin: 0 1rem;
`;
