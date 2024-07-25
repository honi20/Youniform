import React, { useEffect } from 'react';
import { fabric } from "fabric";

const CanvasComp = () => {
  console.log('캔버스 만들기 시작')

  const initCanvas = new fabric.Canvas("canvas", {
      height: 100,
      width: 100,
      backgroundColor: "gray",
  });

  useEffect(() => {
    initCanvas.dispose()
  }, []);;

  return <canvas id="canvas" />;
}

export default CanvasComp;