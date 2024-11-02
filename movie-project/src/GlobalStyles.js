import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  @font-face {
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 300;
  src: url("/fonts/Pretendard-Light.woff2") format("woff2"), 
       url("/fonts/Pretendard-Light.woff") format("woff");
  }
  @font-face {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    src: url("/fonts/Pretendard-Regular.woff2") format("woff2"), 
        url("/fonts/Pretendard-Regular.woff") format("woff");
  }
  @font-face {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 700;
    src: url("/fonts/Pretendard-Bold.woff2") format("woff2"), 
        url("/fonts/Pretendard-Bold.woff") format("woff");
  }
  :root {
    --font-xsmall: clamp(0.5rem, 1vw, 0.8rem);
    --font-small: clamp(0.8rem, 1.5vw, 1rem);
    --font-medium: clamp(1.2rem, 2vw, 1.7rem);
    --font-large: clamp(1.5rem, 2.5vw, 2rem);

    --color-pink: #fc1287;
    --color-pink-dark: #E21079;
    --color-white: #fff;
    --color-gray: #777;
    --color-dark-gray: #555;

    --border-radius-small: 5px;
    --border-radius-medium: 10px;
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
