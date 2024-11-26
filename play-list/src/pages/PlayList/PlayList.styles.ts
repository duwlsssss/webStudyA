import styled from 'styled-components'

export const StyledHeader = styled.header`
  height: 15vh;
  min-height: 100px;
  font-size: 2rem;
  font-weight: bold;
  color: #777;
  background-color: #ffe3fd;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .cart-icon-container{
    position: relative;
  }

  .total-amount{
    position: absolute;
    top: 25px;
    left: 25px;
    background-color: white;
    border-radius: 10px;
    font-size: 0.8rem;
    padding: 0.1rem 0.4rem; 
  }
`;

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem 2rem 1rem;
  align-items: center;
`;

export const StyledTotalPrice = styled.div`
  width: 80vw;
  min-width: 100px;
  padding: 1rem 0.8rem 0;
  border-top: 2px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;

  .total-price{
    font-weight: bold;
  }
`;

export const StyledButton = styled.button`
  font-weight: bold;
  color: #ff5773;
  padding: 0.3rem 0.5rem;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #ff5773;
  transition: all 0.3s;

  &:hover{
    background-color: #ff5773;
    color: white;
  }
`;

export const MordalPotal = styled.div`
  
`;


