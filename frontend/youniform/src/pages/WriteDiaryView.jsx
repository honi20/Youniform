import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { DecorationContainer, DecorationPanel, ToggleBtn, DecorationBtn, DecorationMenu, DecorationBtnContainer } from '../components/Diary/WriteCompStyle';
import WallPaperComp from '../components/Diary/WallPaperComp';
import wallpaper1 from '../assets/wallpaper(1).png';
import wallpaper2 from '../assets/wallpaper(2).png';
import wallpaper3 from '../assets/wallpaper(3).png';
import { fabric } from "fabric";

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding-top: 50px;
`
const CanvasContainer = styled.canvas`
    margin-top: 5px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    width: 400px;
    height: 600px;
`
const WriteDiaryView = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(0);
    const [selectCanvas, setSelectCanvas] = useState(null);
    const canvasRef = useRef(0);

    const handleBtnClick = (index) => {
        setSelectedBtn(index);
    };

    const handleImageClick = async (img) => {
        console.log(img)
        if (selectCanvas) {
            console.log(selectCanvas.backgroundImage);
            selectCanvas.setBackgroundImage(img, selectCanvas.renderAll.bind(selectCanvas));
        }
    };
    const imageUrls = [
        wallpaper1,
        wallpaper2,
        wallpaper3,
    ];

    useEffect(() => {
        // 랜더링할때 canvas 유무 확인
        const initCanvas = new fabric.Canvas("canvas", {
            height: 600,
            width: 400,
            backgroundImage: wallpaper3,
        });
        setSelectCanvas(initCanvas);
        return () => {
            initCanvas.dispose();
        };
    }, []);

    return (
        <Div>
            <canvas id="canvas"></canvas>
            <ToggleBtn onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Hide' : 'Show'}
            </ToggleBtn>
            <DecorationContainer>
                <DecorationPanel $expanded={isExpanded}>
                    <DecorationBtnContainer $expanded={isExpanded}>
                    {[ '배경', '스티커', '폰트', '테마', '사진' ].map((text, index) => (
                        <DecorationBtn
                            key={index}
                            $selected={selectedBtn === index} // 현재 선택된 버튼인지 여부를 prop으로 전달
                            onClick={() => handleBtnClick(index)}
                        >
                            {text}
                        </DecorationBtn>
                    ))}
                    </DecorationBtnContainer>
                </DecorationPanel>
                <DecorationMenu $expanded={isExpanded}>
                    {/* // 배경 및 스티커 박스 어떤 걸 선택했는지에 따라서.... */}
                    <WallPaperComp 
                        wallpapers={imageUrls}
                        onImageClick={handleImageClick} />
                </DecorationMenu>
            </DecorationContainer>
            
        </Div>
      )
}

export default WriteDiaryView
