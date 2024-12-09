import styled from 'styled-components';


const SearchContainer = styled.div`
  width: 100%;
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;

  input{
    width: 50%;
    border-radius: var(--border-radius-small);
    padding: 0.7rem 0.5rem;
  }
  input:hover{
  }
`;

export {SearchContainer,SearchHeader}