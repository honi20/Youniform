import React, { useEffect } from "react";
import styled from "styled-components";

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

const CanvasComp = ({ selectCanvas, setSelectCanvas, decorated }) => {
  useEffect(() => {
    const initCanvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 300,
      backgroundColor: "white",
    });
    setSelectCanvas(initCanvas);

    const bringToFront = (e) => {
      const selectedObject = e.target;
      if (selectedObject) {
        selectedObject.bringToFront();
        initCanvas.renderAll();
      }
    };
    // Event listener for when an object is selected
    initCanvas.on("object:selected", bringToFront); // Changed: Added bringToFront function

    // Optional: bring newly added objects to front
    initCanvas.on("object:added", bringToFront); // Changed: Added bringToFront function

    // Optional: bring modified objects to front
    initCanvas.on("object:modified", bringToFront); // Changed: Added bringToFront function

    return () => {
      initCanvas.off("object:selected", bringToFront); // Clean up event listener
      initCanvas.off("object:added", bringToFront); // Clean up event listener
      initCanvas.off("object:modified", bringToFront); // Clean up event listener
      initCanvas.dispose();
    };
  }, []);
  return (
    <CanvasContainer $decorated={decorated}>
      <canvas id="canvas"></canvas>
    </CanvasContainer>
  );
};

export default CanvasComp;
