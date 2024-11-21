import styled from 'styled-components'

export const StyledItem = styled.div`
  width: 70vw;
  min-width: 100px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;

  .item-left{
    display: flex;
    gap: 1rem;
    align-items: center;

    .item-image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 5px;
    }

    .item-details {
      h3{
        margin-bottom: 0.3rem;
      }
      p{
        color: #777;
        font-weight: bold;
      }
    }
  }
  
  .item-right{
    display: flex;
    align-items: center;
    gap: 1rem;
    .item-controls {
      text-align: center;
      p{
        font-weight: bold;
      }
    }
  }
`;