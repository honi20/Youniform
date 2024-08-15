import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as St from "@pages/Diary/WriteDiaryStyle";
import { fabric } from "fabric";
import { frames, stickers, fonts } from "@assets";
import usePhotoCardStore from "@stores/photoCardStore";
import useResourceStore from "@stores/resoureStore";

import DecoIcon from "@assets/Main/DecoIcon.svg?react";
import ExampleIcon from "@assets/Main/ExIcon.svg?react";
import DownloadIcon from "@assets/Main/Img_out-box_Fill.svg?react";
import InitializeIcon from "@assets/Main/Refresh.svg?react";
import BackgroundIcon from "@assets/Canvas/background.svg?react";

import FontComp from "@components/Diary/Write/FontComp";
import FrameComp from "@components/Photocard/Create/FrameComp";
import StickerComp from "@components/Diary/Write/StickerComp";
import ColorChipComp from "@components/Diary/Write/ColorChipComp";
import BasicModal from "@components/Modal/BasicModal";
import PhotocardCanvas from "@components/Photocard/Create/PhotocardCanvas";
import CategoryComp from "@components/Diary/Write/CategoryComp";
import ExampleModal from "../components/Photocard/Create/ExampleComp";
const ToggleBtn = styled.div`
  /* width: 50%; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  // typo
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
`;

const PhotoCardCreator = () => {
  const navigate = useNavigate();

  const { createPhotoCard, fetchPhotoCardList } = usePhotoCardStore();
  const { backgrounds, stickers, templates, themes, fetchResources, fetchStampList } =
    useResourceStore((state) => ({
      backgrounds: state.backgrounds,
      stickers: state.stickers,
      templates: state.templates,
      themes: state.themes,
      fetchResources: state.fetchResources,
      fetchStampList: state.fetchStampList,
    }));
  const { stampList, selectedCategory, selectedColor } = useResourceStore();
  
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [selectCanvas, setSelectCanvas] = useState(null);
  const [isDecorated, setIsDecorated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [diary, setDiary] = useState(null);

  const fileInputRef = useRef(null); // 파일 입력 참조
  const [isExampleOn, setIsExampleOn] = useState(false); // 초기 상태 off
  const openSaveModal = () => setIsSaveModalOpen(true);
  const closeSaveModal = () => setIsSaveModalOpen(false);

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleBtnClick = (index) => {
    setSelectedBtn(index);
  };

  const handleImageClick = async (selectedImg) => {
    console.log(selectedImg);
    if (selectCanvas) {
      // 기존의 프레임 객체를 찾아서 제거
      const objects = selectCanvas.getObjects();
      objects.forEach((obj) => {
        if (obj.type === "image" && obj !== selectCanvas.backgroundImage) {
          selectCanvas.remove(obj);
        }
      });

      fabric.Image.fromURL(selectedImg, (img) => {
        img.scaleToWidth(selectCanvas.getWidth());
        img.scaleToHeight(selectCanvas.getHeight());
        img.set({
          originX: "center",
          originY: "center",
          left: selectCanvas.getWidth() / 2,
          top: selectCanvas.getHeight() / 2,
          selectable: false,  // 프레임을 선택 불가로 설정
          evented: false,
          hasControls: false,  // 컨트롤 핸들러를 비활성화
          hasBorders: false,   // 경계선을 비활성화
          lockMovementX: true, // X축으로 이동 불가
          lockMovementY: true, // Y축으로 이동 불가
          lockScalingX: true,  // X축 크기 조정 불가
          lockScalingY: true,  // Y축 크기 조정 불가
          lockRotation: true,  // 회전 불가
        });
        selectCanvas.add(img);
        selectCanvas.bringToFront(img); // 새 프레임을 최상위로 가져옴
        selectCanvas.renderAll();
        selectCanvas.add(img);
        selectCanvas.bringToFront(img); // 새 프레임을 최상위로 가져옴
        selectCanvas.renderAll();
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

  const filteredTemplates = selectedColor
    ? Object.values(templates[selectedColor] || [])
    : [];

  const filteredStickers = selectedCategory
    ? Object.values(stickers[selectedCategory] || [])
    : [];

  const renderContent = () => {
    switch (selectedBtn) {
      case 0:
        return (
          <>
            <ColorChipComp />
            <FrameComp
              wallpapers={Object.values(templates).map((mod) => mod.default)}
              onImageClick={handleImageClick}
            />
          </>
        );
      case 1:
        return (
          <>
            <CategoryComp />
            <StickerComp
              stickers={filteredStickers ? filteredStickers : stickers}
              onImageClick={handleStickerClick}
            />
          </>
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
        return <FrameComp />;
    }
  };

  // axios 요청 시 날짜
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleAfterSave = async (index) => {
    // 포토카드 저장
    if (index == 5) {
      const photocardImgUrl = selectCanvas.toDataURL({ format: "png" });
      console.log(photocardImgUrl);
      const formData = new FormData();
      const imageBlob = await fetch(photocardImgUrl).then((res) => res.blob());
      formData.append("file", imageBlob, "image.png");
      await createPhotoCard(formData);
      await fetchPhotoCardList();

      // 다음 모달 open
      setIsConfirmModalOpen(true);
      // 바인더로 이동
      navigate(`/photo-card/binder`);
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

  const fetchData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://i11a308.p.ssafy.io:8080/diaries",
        // headers: {
        //   // "Content-Type": "application/json",
        //   Authorization:
        //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLZ", // 실제 토큰으로 교체하세요
        // },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (selectCanvas) {
        fabric.Image.fromURL(fileURL, (img) => {
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
    }
  };

  const setBackground = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* onClick={openSaveModal} */}
      {/* onClick={downloadCanvas} */}
      <St.Div $decorated={isDecorated}>
        <PhotocardCanvas
          selectCanvas={selectCanvas}
          setSelectCanvas={setSelectCanvas}
          decorated={isDecorated}
        />
        <St.DecorationContainer $decorated={isDecorated}>
          <St.BtnContainer $decorated={isDecorated}>
            <div style={{ display: "flex" }}>
              <St.Btn $decorated={isDecorated} onClick={setBackground}>
                <St.IconContainer>
                  <BackgroundIcon />
                </St.IconContainer>
                <St.IconFont>배경</St.IconFont>
              </St.Btn>
              <St.Btn
                $decorated={isDecorated}
                onClick={() => setIsDecorated(!isDecorated)}
              >
                <St.IconContainer>
                  <DecoIcon />
                </St.IconContainer>
                <St.IconFont>꾸미기</St.IconFont>
              </St.Btn>
              <St.Btn $decorated={isDecorated} onClick={() => setIsExampleOn((prev) => !prev)}>
                <St.IconContainer>
                  <ExampleIcon />
                </St.IconContainer>
                <St.IconFont>예시</St.IconFont>
              </St.Btn>
              <St.Btn $decorated={isDecorated} onClick={openSaveModal}>
                <St.IconContainer>
                  <DownloadIcon />
                </St.IconContainer>
                <St.IconFont>저장</St.IconFont>
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
                {["템플릿", "스티커", "폰트"].map((text, index) => (
                  <St.DecorationBtn
                    key={index}
                    $selected={selectedBtn === index}
                    onClick={() => handleBtnClick(index)}
                  >
                    {text}
                  </St.DecorationBtn>
                ))}
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
          state="PhotocardSaveWarning"
          isOpen={isSaveModalOpen}
          onClose={closeSaveModal}
          onButtonClick={handleAfterSave}
        />
        <BasicModal
          state={"PhotoCardSaved"}
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
        />
      </St.Div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {isExampleOn && <ExampleModal
          isOn={isExampleOn}
          setIsOn={setIsExampleOn}
/>}
    </>
  );
};

export default PhotoCardCreator;
