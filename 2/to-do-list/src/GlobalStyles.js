import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }

  body {
    background-color: #fff;
    color: #777;
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin: 0 auto;
    padding: 2rem;
  }

  input{
    outline: none;
    border: none;
  }
`;

export default GlobalStyles;