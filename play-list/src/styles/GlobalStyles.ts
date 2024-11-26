import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }

  body {
    color: #333;
    background-color: white;
    font-family: 'Arial', sans-serif;
  }
  
  button{
    border: none;
    background-color: white;
  }
`;

export default GlobalStyles;
