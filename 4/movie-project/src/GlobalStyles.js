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
  body {
    color: white;
    background-color: black;
    font-family: "Pretendard", sans-serif;
  }
  img{
    display:block;
  }
`;

export default GlobalStyles;
