import React, { useEffect } from "react";
import { fabric } from "fabric";
import FontFaceObserver from 'fontfaceobserver';


const Canvas = ({ selectCanvas, setSelectCanvas, decorated, diary }) => {
  // console.log("decorated: ", decorated);
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
    if (selectCanvas && diary) {
      loadCanvasFromJSON(selectCanvas, diary);
      selectCanvas.renderAll();
    }
  }, [selectCanvas, diary]);

  useEffect(() => {
    if (selectCanvas) {
      const objects = selectCanvas.getObjects();
      for (const obj of objects) {
        obj.selectable = decorated;
      }
      selectCanvas.renderAll();
    }
  }, [selectCanvas, decorated]);

  return (
    <div $decorated={decorated}>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Canvas;
