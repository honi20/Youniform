import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
`
const CanvasContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    height: 60%;
    border: 1px solid black;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
`
const test = () => {
    const [selectCanvas, setSelectCanvas] = useState(null);
    
    const loadCanvasFromJSON = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const json = e.target.result;
                selectCanvas.loadFromJSON(json, () => {
                    selectCanvas.renderAll();
                });
            };
            reader.readAsText(file);
        }
    };
    useEffect(() => {
        const initCanvas = new fabric.Canvas("canvas", {
            height: 500,
            width: 300,
            backgroundColor: 'white',
        });
        setSelectCanvas(initCanvas);
        return () => {
            initCanvas.dispose();
        };
    }, []);
    return (
        <Div>
            <CanvasContainer>
                    <canvas id="canvas"></canvas>
            </CanvasContainer>
            <input type="file" accept=".json" onChange={loadCanvasFromJSON} />
        </Div>
  )
}

export default test
