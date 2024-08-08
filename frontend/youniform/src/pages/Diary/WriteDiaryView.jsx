import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as St from "@pages/Diary/WriteDiaryStyle";
import { fabric } from "fabric";
import { wallpapers, stickers, fonts } from "@assets";

import DecoIcon from "@assets/DecoIcon.svg?react";
import ExampleIcon from "@assets/ExIcon.svg?react";
import DownloadIcon from "@assets/Img_out-box_Fill.svg?react";
import InitializeIcon from "@assets/Refresh.svg?react";
import SaveIcon from "@assets/Save_fill.svg?react";

import FontComp from "@components/Diary/Write/FontComp";
import WallPaperComp from "@components/Diary/Write/WallPaperComp";
import StickerComp from "@components/Diary/Write/StickerComp";
import CanvasComp from "@components/Diary/Write/CanvasComp";
import ColorChipComp from "../../components/Diary/Write/ColorChipComp";
import BasicModal from "@components/Modal/BasicModal";

import useDiaryStore from "@stores/diaryStore";

const WriteDiaryView = () => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [selectCanvas, setSelectCanvas] = useState(null);
  const [isDecorated, setIsDecorated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [update, setUpdate] = useState(false);
  const { diaryId } = useParams();
  const { diary, fetchDiary, addDiary } = useDiaryStore();

  useEffect(() => {
    if (diaryId) {
      fetchDiary(diaryId);
      setUpdate(true);
    }
  }, [fetchDiary]);

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
        fontFamily: getFontName(selectedFont),
        fill: "#000000",
      });

      selectCanvas.add(text);
      selectCanvas.renderAll();
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
  const renderContent = () => {
    switch (selectedBtn) {
      case 0:
        return (
          <>
            <ColorChipComp />
            <WallPaperComp
              wallpapers={Object.values(wallpapers).map((mod) => mod.default)}
              onImageClick={handleImageClick}
            />
          </>
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
      case 5:
        // 프레임
        return;
      default:
        return <WallPaperComp />;
    }
  };
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setDate(currentDate);
  }, []);

  const handleAfterSave = async () => {
    try {
      // saveCanvas();
      const formData = await saveDiaryObject();
      const diaryId = await addDiary(formData);
      console.log("Diary ID:", diaryId);
      await moveToDetailPage(diaryId);
    } catch (error) {
      console.error("Error saving diary object:", error);
    }
  };
  // const saveCanvas = () => {
  //   if (selectCanvas) {
  //     const json = selectCanvas.toJSON();
  //     const dataStr =
  //       "data:text/json;charset=utf-8," +
  //       encodeURIComponent(JSON.stringify(json));
  //     const downloadAnchorNode = document.createElement("a");
  //     downloadAnchorNode.setAttribute("href", dataStr);
  //     downloadAnchorNode.setAttribute("download", "canvas.json");
  //     document.body.appendChild(downloadAnchorNode);
  //     downloadAnchorNode.click();
  //     downloadAnchorNode.remove();
  //   }
  // };
  const logFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };
  const saveDiaryObject = async () => {
    try {
      if (selectCanvas) {
        const json = selectCanvas.toJSON();
        // const jsonBlob = await fetch(json).then((res) => res.blob());
        const jsonBlob = new Blob([JSON.stringify(json)], {
          type: "application/json",
        });

        const diaryImgUrl = selectCanvas.toDataURL({ format: "png" });
        const imageBlob = await fetch(diaryImgUrl).then((res) => res.blob());

        const formData = new FormData();
        const dto = {
          diaryDate: date,
          contents: json,
          scope: "ALL",
          stampId: 1,
        };

        const dtoBlob = new Blob([JSON.stringify(dto)], {
          type: "application/json",
        });
        formData.append("file", imageBlob);
        formData.append("dto", dtoBlob);

        console.log("FormData contents:");
        logFormData(formData);
        return formData;
      }
    } catch (error) {
      throw new Error("Error saving diary object: " + error.message);
    }
  };

  const moveToDetailPage = async (diaryId) => {
    try {
      if (diaryId) {
        console.log(diaryId);
        navigate(`/diary/${diaryId}`); // 페이지 이동
      }
    } catch (error) {
      console.error("Error moving to detail page:", error);
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

  const handleCloseBtn = () => {
    const objects = selectCanvas.getObjects();
    for (const obj of objects) {
      console.log("선택 해제");
      obj.selectable = false;
    }
    selectCanvas.renderAll();
    setIsDecorated(!isDecorated);
  };
  return (
    <>
      <St.SaveBtn onClick={openSaveModal}>
        <St.IconContainer>
          <SaveIcon />
        </St.IconContainer>
        <St.IconFont>저장</St.IconFont>
      </St.SaveBtn>
      <St.Div $decorated={isDecorated}>
        <CanvasComp
          selectCanvas={selectCanvas}
          setSelectCanvas={setSelectCanvas}
          decorated={isDecorated}
          diary={diary.contents}
          update={update}
        />
        <St.DecorationContainer $decorated={isDecorated}>
          <St.BtnContainer $decorated={isDecorated}>
            <div style={{ display: "flex" }}>
              <St.Btn
                $decorated={isDecorated}
                onClick={() => setIsDecorated(!isDecorated)}
              >
                <St.IconContainer>
                  <DecoIcon />
                </St.IconContainer>
                <St.IconFont>꾸미기</St.IconFont>
              </St.Btn>
              <St.Btn $decorated={isDecorated} onClick={openModal}>
                <St.IconContainer>
                  <ExampleIcon />
                </St.IconContainer>
                <St.IconFont>예시</St.IconFont>
              </St.Btn>
              <St.Btn $decorated={isDecorated} onClick={downloadCanvas}>
                <St.IconContainer>
                  <DownloadIcon />
                </St.IconContainer>
                <St.IconFont>다운로드</St.IconFont>
              </St.Btn>
            </div>
            <St.Btn $decorated={isDecorated} onClick={handleResetClick}>
              <St.IconContainer>
                <InitializeIcon />
              </St.IconContainer>
              <St.IconFont>초기화</St.IconFont>
            </St.Btn>
          </St.BtnContainer>
          <St.DecorationPanel $decorated={isDecorated}>
            <St.DecorationBtnContainer $decorated={isDecorated}>
              <div style={{ display: "flex", width: "100%" }}>
                {["배경", "스티커", "폰트", "테마", "사진"].map(
                  (text, index) => (
                    <St.DecorationBtn
                      key={index}
                      $selected={selectedBtn === index} // 현재 선택된 버튼인지 여부를 prop으로 전달
                      onClick={() => handleBtnClick(index)}
                    >
                      {text}
                    </St.DecorationBtn>
                  )
                )}
              </div>
            </St.DecorationBtnContainer>
          </St.DecorationPanel>
          <St.DecorationMenu $decorated={isDecorated}>
            {renderContent()}
          </St.DecorationMenu>
          <St.CloseBtn $decorated={isDecorated} onClick={handleCloseBtn}>
            저장
          </St.CloseBtn>
        </St.DecorationContainer>
        <BasicModal
          state="DiarySaved"
          isOpen={isSaveModalOpen}
          onClose={closeSaveModal}
          onButtonClick={handleAfterSave}
        />
      </St.Div>
    </>
  );
};

export default WriteDiaryView;
