import React, { useEffect } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
const CanvasContainer = styled.div`
  height: 502px;
  width: 302px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  /* margin-top: ${(props) => (props.$decorated ? "" : "10px")}; */
  top: ${(props) => (props.$decorated ? "10px" : "60px")};
  z-index: ${(props) => (props.$decorated ? "100" : "")};
  position: absolute;
  /* border: 1px solid red; */
`;

const PhotocardCanvas = ({ selectCanvas, setSelectCanvas, decorated }) => {
  useEffect(() => {
    const initCanvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 300,
      backgroundColor: "white",
      selection: decorated,
      // interactive: decorated,
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

  useEffect(() => {
    if (selectCanvas) {
      const objects = selectCanvas.getObjects();
      for (const obj of objects) {
        console.log('epzh')
        obj.selectable = decorated;
      }
      selectCanvas.renderAll();
    }
  }, [selectCanvas, decorated])
  return (
    <CanvasContainer $decorated={decorated}>
      <canvas id="canvas"></canvas>
    </CanvasContainer>
  );
};

export default PhotocardCanvas;
