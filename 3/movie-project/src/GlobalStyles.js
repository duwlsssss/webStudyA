import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    color: white;
    background-color: black;
    font-family: Arial, sans-serif;
  }
`;

export default GlobalStyles;
