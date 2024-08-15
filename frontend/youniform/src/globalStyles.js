import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/path/to/font.woff2') format('woff2'),
         url('/path/to/font.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Pretendard', sans-serif;
  }
  
  textarea {
    font-family: 'Pretendard', sans-serif;
  }
`;

export default GlobalStyle;