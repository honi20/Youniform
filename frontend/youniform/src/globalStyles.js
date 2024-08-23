import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
@font-face {
  font-family: 'Galmuri14';
  src: url('/path/to/assets/fonts/Galmuri14.ttf') format('ttf');
}
  body {
    font-family: 'Pretendard', sans-serif;
  }
  
  textarea {
    font-family: 'Pretendard', sans-serif;
  }
`;

export default GlobalStyle;