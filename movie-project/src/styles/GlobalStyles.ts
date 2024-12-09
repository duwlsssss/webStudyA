import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }

  body {
    color: var(--color-white);
    background-color: black;
    font-family: "Pretendard", sans-serif;
  }

  input{
    outline:none;
    border: none;
  }

  img{
    display:block;
  }

`;

export default GlobalStyles;
