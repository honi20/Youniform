import React, { useEffect, useRef } from 'react';
import { Canvas, Rect } from 'fabric';

const StickerTest = () => {
  const canvasRef = useRef(null);

  // useEffect 훅을 사용하여 컴포넌트가 마운트된 후에 실행되는 사이드 이펙트를 처리합니다.
  useEffect(() => {
    // useRef를 사용하여 Canvas 요소를 참조합니다.
    const canvas = new Canvas(canvasRef.current);

    // Fabric.js를 사용하여 사각형 객체를 생성합니다.
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    // 캔버스에 사각형 객체를 추가합니다.
    canvas.add(rect);

    // 컴포넌트가 언마운트될 때 캔버스를 정리하는 클린업 함수를 반환합니다.
    return () => {
      canvas.dispose(); // 캔버스 객체를 정리합니다.
    };
  }, []); // 빈 배열을 의존성 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <div>
      {/* Canvas 요소를 JSX에서 생성하고 useRef로 참조된 canvasRef를 연결합니다. */}
      <canvas id="c" ref={canvasRef} width="600" height="400" />
    </div>
  );
};

export default StickerTest;
