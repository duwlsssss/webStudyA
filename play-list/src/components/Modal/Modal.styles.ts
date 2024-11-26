import styled from 'styled-components'

export const ModalPotal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModal = styled.div`
  position: absolute;
  padding: 2rem;
  border-radius: 20px;
  color: #333;
  background-color: white;
  width: 400px;
  height: 200px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .close{
    align-self: flex-end;
  }

  .btn-container{
    display: flex;
    gap: 2rem;

    .btn{
      border-radius: 10px;
      width: 90px;
      height: 30px;
      transition: all 0.3s;
    }
    .btn.yes{
      border: 2px solid #ff5773;
      &:hover {
        background-color: #ff5773;
        color: white;
      }
    }
    .btn.no{
      border: 3px solid #598bff;
      &:hover {
        background-color: #598bff;
        color: white;
      }
    }
  }
`;