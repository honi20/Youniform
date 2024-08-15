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
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  overflow-y: auto;
  max-height: 100%;
  margin-bottom: 5px;
  /* border: 1px solid red; */
`;

const FontItem = styled.div`
  flex: 0 0 30%;
  aspect-ratio: 6/4.5;
  overflow: hidden;
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
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
};

const getKoreanFontName = (fontName) => {
  return fontNameMapping[fontName] || fontName;
};

const FontComp = ({ fonts, onFontClick }) => {
  const fontData = fonts.map((fontPath) => ({
    path: fontPath,
    name: getFontName(fontPath),
  }));
  console.log(fontData);
  return (
    <>
      <GlobalStyle fonts={fontData} />
      <FontContainer>
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
      </FontContainer>
    </>
  );
};

export default FontComp;
