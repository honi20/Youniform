import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { fabric } from "fabric";
import FontFaceObserver from 'fontfaceobserver';
import { fonts } from "@assets";

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
const CanvasContainer = styled.div`
  height: 502px;
  width: 302px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  top: ${(props) => (props.$decorated ? "10px" : "60px")};
  z-index: ${(props) => (props.$decorated ? "100" : "")};
  position: absolute;
`;

const Div = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: center;
  height: auto;
`;

// const loadCanvasFromJSON = (canvas, json) => {
//   console.log("loadCanvasFromJSON", json)
//   // const parsedJSON = JSON.parse(json);
//   // console.log(parsedJSON)
//   const fonts = Object.values(fonts).map((mod) => mod.default)
//   const fontData = fonts.map((fontPath) => ({
//     path: fontPath,
//     // name: getFontName(fontPath),
//   }));
//   console.log(fontData);

  
//   const fontPromises = [...fonts].map(fontName => {
//     // console.log(fontName)
//     const font = new FontFaceObserver(fontName);
//     console.log(font)
//     return font.load();
//   });

//   Promise.all(fontPromises)
//     .then(() => {
//       // 모든 폰트가 로드된 후 캔버스를 로드합니다.
//       console.log("render")
//       canvas.loadFromJSON(json, () => {
//         canvas.renderAll();
//       });
//     })
//     .catch((err) => {
//       console.error('Failed to load fonts:', err);
//       // 폰트 로드에 실패한 경우라도 기본 캔버스를 로드합니다.
//       canvas.loadFromJSON(json, () => {
//         canvas.renderAll();
//       });
//     });
// };
const getFontName = (path) => {
  const parts = path.split("/");
  const fileName = parts[parts.length - 1];
  const baseName = fileName.split(".")[0];
  
  const cleanName = baseName.replace(/[-].*$/, ""); // '-' 또는 '_' 뒤의 모든 것을 제거

  return cleanName;
};
const CanvasComp = ({
  selectCanvas,
  setSelectCanvas,
  decorated,
  diary,
  update,
  fonts, 
}) => {
  const [initialRender, setInitialRender] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const fontData = fonts.map((fontPath) => ({
    path: fontPath,
    name: getFontName(fontPath),
  }));

  useEffect(() => {
    console.log("decorated: ", decorated);
    console.log("캔버스 초기화");
    const initCanvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 300,
      backgroundColor: "white",
      selection: decorated,
    });
    setSelectCanvas(initCanvas);

    const bringToFront = (e) => {
      const selectedObject = e.target;
      if (selectedObject) {
        selectedObject.bringToFront();
        initCanvas.renderAll();
      }
    };
    initCanvas.on("object:selected", bringToFront);
    initCanvas.on("object:added", bringToFront);
    initCanvas.on("object:modified", bringToFront);

    return () => {
      initCanvas.off("object:selected", bringToFront);
      initCanvas.off("object:added", bringToFront);
      initCanvas.off("object:modified", bringToFront);
      initCanvas.dispose();
    };
    
  }, []);

  const loadFonts = () => {
    const fontPromises = fontData.map((font) => {
      const fontObserver = new FontFaceObserver(font.name);
      return fontObserver.load();
    });

    Promise.all(fontPromises)
      .then(() => {
        setFontsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load fonts:', err);
        setFontsLoaded(true); // 폰트 로드 실패 시에도 진행
      });
  };

  useEffect(() => {
    loadFonts();
  }, [fonts]);

  useEffect(() => {
    if (selectCanvas && diary) {
      selectCanvas.loadFromJSON(diary, () => {
        selectCanvas.getObjects('textbox').forEach((obj) => {
          console.log(obj.fontFamily)
          obj.set({ fontFamily: obj.fontFamily });
        });
        selectCanvas.renderAll();
        setInitialRender(true);
      });
    }
  }, [selectCanvas, diary]);

  useEffect(() => {
    if (selectCanvas && diary) {
      console.log("객체 잠금");
      const objects = selectCanvas.getObjects();
      for (const obj of objects) {
        obj.selectable = decorated;
      }
      selectCanvas.renderAll();
    }
  }, [selectCanvas, decorated, diary]);

  return (
    <>
    <GlobalStyle fonts={fontData} />
    <CanvasContainer $decorated={decorated}>
      <canvas id="canvas"></canvas>
    </CanvasContainer>
    </>
  );
};

export default CanvasComp;
