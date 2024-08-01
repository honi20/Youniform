import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  SaveBtn,
  IconFont,
  Btn,
  CloseBtn,
  DecorationContainer,
  DecorationPanel,
  DecorationBtn,
  DecorationMenu,
  DecorationBtnContainer,
  BtnContainer,
} from "./WriteDiaryStyle";
import WallPaperComp from "@components/Diary/Write/WallPaperComp";
import { fabric } from "fabric";
import StickerComp from "@components/Diary/Write/StickerComp";
import { wallpapers, stickers, fonts } from "@assets";
import FontComp from "@components/Diary/Write/FontComp";
import DecoIcon from "@assets/DecoIcon.svg?react";
import ExampleIcon from "@assets/ExIcon.svg?react";
import DownloadIcon from "@assets/Img_out-box_Fill.svg?react";
import InitializeIcon from "@assets/Refresh.svg?react";
import SaveIcon from "@assets/Save_fill.svg?react";
import ExpandIcon from "@assets/Expand_down.svg?react";
import ModalComp from "@components/Modal/ExampleModalComp";
import SaveModalComp from "@components/Modal/SaveModalComp";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 120px);
  border: 5px solid black;
`;
const CanvasContainer = styled.div`
  margin-top: 10px;
  width: 302px;
  height: 502px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  margin-bottom: 0%;
  box-sizing: border-box;
`;
const IconContainer = styled.div`
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WriteDiaryView = () => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [selectCanvas, setSelectCanvas] = useState(null);
  const [isDecorated, setIsDecorated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSaveModal = () => setIsSaveModalOpen(true);
  const closeSaveModal = () => setIsSaveModalOpen(false);

  const navigate = useNavigate();

  const handleBtnClick = (index) => {
    setSelectedBtn(index);
  };

  const handleImageClick = async (selectedImg) => {
    console.log(selectedImg);
    if (selectCanvas) {
      fabric.Image.fromURL(selectedImg, (img) => {
        img.scaleToWidth(selectCanvas.getWidth());
        img.scaleToHeight(selectCanvas.getHeight());
        img.set({
          originX: "center",
          originY: "center",
          left: selectCanvas.getWidth() / 2,
          top: selectCanvas.getHeight() / 2,
        });
        selectCanvas.setBackgroundImage(
          img,
          selectCanvas.renderAll.bind(selectCanvas)
        );
      });
    }
  };

  const handleStickerClick = async (selectedSticker) => {
    console.log(selectedSticker);
    if (selectCanvas) {
      fabric.Image.fromURL(selectedSticker, (img) => {
        img.scaleToHeight(100);
        img.set({
          left: selectCanvas.getWidth() / 2,
          top: selectCanvas.getHeight() / 2,
          originX: "center",
          originY: "center",
        });
        selectCanvas.add(img);
        selectCanvas.renderAll();
      });
    }
  };

  const handleFontClick = async (selectedFont) => {
    const getFontName = (path) => {
      const parts = path.split("/");
      const fileName = parts[parts.length - 1];
      return fileName.split(".")[0];
    };
    if (selectCanvas) {
      console.log(selectedFont);
      const text = new fabric.Textbox("입력하세요.", {
        left: selectCanvas.getWidth() / 2,
        top: selectCanvas.getHeight() / 2,
        fontSize: 30,
        originX: "center",
        originY: "center",
        fontFamily: getFontName(selectedFont), // 선택한 폰트 적용
        fill: "#000000",
      });

      selectCanvas.add(text);
      selectCanvas.renderAll();
    }
  };

  const renderContent = () => {
    switch (selectedBtn) {
      case 0:
        return (
          <WallPaperComp
            wallpapers={Object.values(wallpapers).map((mod) => mod.default)}
            onImageClick={handleImageClick}
          />
        );
      case 1:
        return (
          <StickerComp
            stickers={Object.values(stickers).map((mod) => mod.default)}
            onImageClick={handleStickerClick}
          />
        );
      case 2:
        return (
          <FontComp
            fonts={Object.values(fonts).map((mod) => mod.default)}
            onFontClick={handleFontClick}
          />
        );
      case 3:
        return <div>테마</div>; // 테마 컴포지션
      case 4:
        return <div>사진</div>; // 사진 컴포지션
      default:
        return (
          <WallPaperComp
            wallpapers={imageUrls}
            onImageClick={handleImageClick}
          />
        );
    }
  };

  const handleResetClick = () => {
    if (selectCanvas) {
      selectCanvas.clear();
      selectCanvas.setBackgroundColor(
        "white",
        selectCanvas.renderAll.bind(selectCanvas)
      );
    }
  };

  const saveCanvas = () => {
    if (selectCanvas) {
      const json = selectCanvas.toJSON();
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(json));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "canvas.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };
  const saveCanvasAtLocalStorage = () => {
    if (selectCanvas) {
      const json = selectCanvas.toJSON();
      const jsonString = JSON.stringify(json);
      localStorage.setItem("canvasData", jsonString);
    }
  };

  const downloadCanvas = () => {
    if (selectCanvas) {
      const dataURL = selectCanvas.toDataURL({ format: "png" });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAfterSave = () => {
    saveCanvas();
    saveCanvasAtLocalStorage();
    navigate("/diary/detail");
  };
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
        selectedObject.bringToFront(); // Bring the object to the top layer
        initCanvas.renderAll(); // Re-render the canvas to reflect changes
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
    <Div>
      <SaveBtn onClick={openSaveModal}>
        <IconContainer>
          <SaveIcon />
        </IconContainer>
        <IconFont>저장</IconFont>
      </SaveBtn>
      <CanvasContainer>
        <canvas id="canvas"></canvas>
      </CanvasContainer>
      <DecorationContainer>
        <BtnContainer $decorated={isDecorated}>
          <div style={{ display: "flex" }}>
            <Btn
              $decorated={isDecorated}
              onClick={() => setIsDecorated(!isDecorated)}
            >
              <IconContainer>
                <DecoIcon />
              </IconContainer>
              <IconFont>꾸미기</IconFont>
            </Btn>
            <Btn $decorated={isDecorated} onClick={openModal}>
              <IconContainer>
                <ExampleIcon />
              </IconContainer>
              <IconFont>예시</IconFont>
            </Btn>
            <Btn $decorated={isDecorated} onClick={downloadCanvas}>
              <IconContainer>
                <DownloadIcon />
              </IconContainer>
              <IconFont>다운로드</IconFont>
            </Btn>
          </div>
          <Btn $decorated={isDecorated} onClick={handleResetClick}>
            <IconContainer>
              <InitializeIcon />
            </IconContainer>
            <IconFont>초기화</IconFont>
          </Btn>
        </BtnContainer>
        <DecorationPanel $decorated={isDecorated}>
          <DecorationBtnContainer $decorated={isDecorated}>
            <div style={{ display: "flex", width: "100%" }}>
              {["배경", "스티커", "폰트", "테마", "사진"].map((text, index) => (
                <DecorationBtn
                  key={index}
                  $selected={selectedBtn === index} // 현재 선택된 버튼인지 여부를 prop으로 전달
                  onClick={() => handleBtnClick(index)}
                >
                  {text}
                </DecorationBtn>
              ))}
            </div>
            <CloseBtn onClick={() => setIsDecorated(!isDecorated)}>
              <ExpandIcon />
            </CloseBtn>
          </DecorationBtnContainer>
        </DecorationPanel>
        <DecorationMenu $decorated={isDecorated}>
          {renderContent()}
        </DecorationMenu>
      </DecorationContainer>
      <ModalComp isOpen={isModalOpen} onClose={closeModal} />
      <SaveModalComp
        isOpen={isSaveModalOpen}
        onClose={closeSaveModal}
        onSave={handleAfterSave}
      />
    </Div>
  );
};

export default WriteDiaryView;
