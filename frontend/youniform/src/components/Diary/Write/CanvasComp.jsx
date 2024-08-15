import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fabric } from "fabric";

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

const loadCanvasFromJSON = (canvas, json) => {
  console.log('test')
  canvas.loadFromJSON(json, () => {
    canvas.renderAll();
  });
};

const CanvasComp = ({
  selectCanvas,
  setSelectCanvas,
  decorated,
  diary,
  update,
}) => {
  const [initialRender, setInitialRender] = useState(false)
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
  useEffect(() => {
    if (!initialRender && selectCanvas && diary) {
      loadCanvasFromJSON(selectCanvas, diary);
      setInitialRender(true)
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
    <CanvasContainer $decorated={decorated}>
      <canvas id="canvas"></canvas>
    </CanvasContainer>
  );
};

export default CanvasComp;
