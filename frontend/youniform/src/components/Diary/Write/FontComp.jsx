import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    ${(props) =>
      props.fonts.map(
        (font) => `
        @font-face {
            font-family: '${font.name}';
            src: url(${font.path});
            font-weight: normal;
            font-style: normal;
        }
    `
      )}
`;

const FontContainer = styled.div`
  display: flex;
  height: 100%;
  /* border: 1px solid red; */
`;
const Wrapper = styled.div`
  padding-left: 3%;
  display: flex;
  flex-flow: row wrap;
  gap: 3.3%;
  margin: 10px;
  overflow-y: auto;
  /* border: 1px solid red; */
`;
const FontItem = styled.div`
  flex: 0 0 30%;
  aspect-ratio: 6/4.5;
  overflow: hidden;
  background: white;
  /* justify-content: center;
  align-items: center; */
  font-family: ${(props) => props.$fontName || "sans-serif"};
  border-radius: 0.625rem;
  border: 1px solid #000;
`;

const Font = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getFontName = (path) => {
  const parts = path.split("/");
  const fileName = parts[parts.length - 1];
  const baseName = fileName.split(".")[0];
  
  const cleanName = baseName.replace(/[-].*$/, ""); // '-' 또는 '_' 뒤의 모든 것을 제거

  return cleanName;
};

const fontNameMapping = {
  Dovemayo_gothic: "둘기마요고딕",
  Galmuri14: "갈무리14",
  NanumSquareRoundR: "나눔스퀘어",
  RascalMedium: "J개구쟁이",
  "MangoDdobak": "또박체",
  TheJamsil: "더잠실체",
  "NotoSansKR": "Noto Sans",
  Ownglyph: "온글잎 언즈체",
  yangjin: "양진체",
};

const getKoreanFontName = (fontName) => {
  return fontNameMapping[fontName] || fontName;
};

const FontComp = ({ fonts, onFontClick }) => {
  const fontData = fonts.map((fontPath) => ({
    path: fontPath,
    name: getFontName(fontPath),
  }));
  // console.log(fontData);
  return (
    <>
      <GlobalStyle fonts={fontData} />
      <FontContainer>
        <Wrapper>
        {fontData.map((font, index) => {
          return (
            <FontItem
              key={index}
              onClickCapture={() => onFontClick(font.path)}
              // fontPath={fontUrls}
              $fontName={font.name}
            >
              <Font>{getKoreanFontName(font.name)}</Font>
            </FontItem>
          );
        })}
        </Wrapper>
      </FontContainer>
    </>
  );
};

export default FontComp;
