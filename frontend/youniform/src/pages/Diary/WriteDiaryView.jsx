import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as St from "@pages/Diary/WriteDiaryStyle";
import { fabric } from "fabric";
import { wallpapers, stickers, fonts } from "@assets";
import styled from "styled-components";
import DecoIcon from "@assets/Main/DecoIcon.svg?react";
import ExampleIcon from "@assets/Main/ExIcon.svg?react";
import DownloadIcon from "@assets/Main/Img_out-box_Fill.svg?react";
import InitializeIcon from "@assets/Main/Refresh.svg?react";
import SaveIcon from "@assets/Main/Save_fill.svg?react";
import DownIcon from "@assets/Main/chevron-down.svg?react";
import UpIcon from "@assets/Main/chevron-up.svg?react";

import FontComp from "@components/Diary/Write/FontComp";
import WallPaperComp from "@components/Diary/Write/WallPaperComp";
import StickerComp from "@components/Diary/Write/StickerComp";
import CanvasComp from "@components/Diary/Write/CanvasComp";
import ColorChipComp from "@components/Diary/Write/ColorChipComp";
import BasicModal from "@components/Modal/BasicModal";
import DiaryModal from "@components/Diary/DiaryModal";
import useDiaryStore from "@stores/diaryStore";
import useResourceStore from "@stores/resoureStore";
import CategoryComp from "../../components/Diary/Write/CategoryComp";
import ImageComp from "../../components/Diary/Write/ImageComp";
import ThemeComp from "../../components/Diary/Write/ThemeComp";
import ExampleModal from "../../components/Diary/Write/ExampleModal";
import CloseSvg from "@assets/Post/Close_round_light.svg?react"
// import html2canvas from "html2canvas"
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

const toggle = (isOn) => {
  return (
    <div style={{ display: "flex" }}>{isOn ? <UpIcon /> : <DownIcon />}</div>
  );
};

const WriteDiaryView = () => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [selectCanvas, setSelectCanvas] = useState(null);
  const [isDecorated, setIsDecorated] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [update, setUpdate] = useState(false);
  const { diaryId, diaryDate } = useParams();
  const navigate = useNavigate();
  const {
    diary,
    fetchDiary,
    addDiary,
    updateDiary,
    initializeDiary,
    fetchMonthlyDiaries,
  } = useDiaryStore();
  const { backgrounds, stickers, themes, fetchResources, fetchStampList } =
    useResourceStore((state) => ({
      backgrounds: state.backgrounds,
      stickers: state.stickers,
      themes: state.themes,
      fetchResources: state.fetchResources,
      fetchStampList: state.fetchStampList,
    }));
  const { stampList, selectedCategory, selectedColor } = useResourceStore();
  const [isOn, setIsOn] = useState(false); // 초기 상태 off
  const [isExampleOn, setIsExampleOn] = useState(false); // 초기 상태 off
  const deleteBtnRef = useRef();
  const handleToggle = () => setIsOn((prevIsOn) => !prevIsOn);
  useEffect(() => {
    if (diaryId) {
      fetchDiary(diaryId);
      setUpdate(true);
    } else {
      initializeDiary();
      setUpdate(false);
    }
  }, [diaryId, fetchDiary]);

  useEffect(() => {
    fetchResources();
    console.log(themes);
    fetchStampList();
  }, [fetchResources, fetchStampList]);

  useEffect(() => {
    if (selectCanvas) {
      const updateDeleteButtonPosition = () => {
        const activeObjects = selectCanvas.getActiveObjects();
        if (activeObjects.length > 0) {
          const obj = activeObjects[0];
          const test = activeObjects[0].getCenterPoint()
          // console.log(test)
          const imgWidth = obj.getScaledWidth();
          const imgHeight = obj.getScaledHeight();
          if (deleteBtnRef.current) {
            deleteBtnRef.current.style.display = "block";
            deleteBtnRef.current.style.left = `${test.x - imgWidth/2 + 48}px`;
            deleteBtnRef.current.style.top = `${test.y - imgHeight/2 + 10}px`;
            deleteBtnRef.current.style.display = 'flex'; 
          }
        }
      };

      selectCanvas.on('object:scaling', updateDeleteButtonPosition);
      selectCanvas.on('object:moving', updateDeleteButtonPosition);
      selectCanvas.on('selection:created', updateDeleteButtonPosition);
      selectCanvas.on('selection:updated', updateDeleteButtonPosition);
      selectCanvas.on('selection:cleared', () => {
        if (deleteBtnRef.current) {
          deleteBtnRef.current.style.display = 'none'; 
        }
      });

      return () => {
        selectCanvas.off('object:scaling', updateDeleteButtonPosition);
        selectCanvas.off('object:moving', updateDeleteButtonPosition);
        selectCanvas.off('selection:created', updateDeleteButtonPosition);
        selectCanvas.off('selection:updated', updateDeleteButtonPosition);
        selectCanvas.off('selection:cleared');
      };
    }
  }, [selectCanvas]);
  const handleBtnClick = (index) => {
    setSelectedBtn(index);
  };

  const handleImageClick = async (background) => {
    console.log(background);
    if (selectCanvas) {
      fabric.Image.fromURL(
        background.imgUrl,
        (img) => {
          if (background.imgUrl.startsWith("https")) {
            img.set({ crossOrigin: "anonymous" });
          }
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
        },
        { crossOrigin: "anonymous" }
      );
    }
  };

  const handleStickerClick = async (sticker) => {
    if (selectCanvas) {
      fabric.Image.fromURL(
        sticker.imgUrl,
        (img) => {
          if (sticker.imgUrl.startsWith("http")) {
            img.set({ crossOrigin: "anonymous" });
          }
          img.scaleToHeight(100);
          img.set({
            left: selectCanvas.getWidth() / 2,
            top: selectCanvas.getHeight() / 2,
            originX: "center",
            originY: "center",
          });
          selectCanvas.add(img);
          selectCanvas.renderAll();
        },
        { crossOrigin: "anonymous" }
      );
    }
  };

  const handleFontClick = async (selectedFont) => {
    const getFontName = (path) => {
      const parts = path.split("/");
      const fileName = parts[parts.length - 1];
      const baseName = fileName.split(".")[0];
      const cleanName = baseName.replace(/[-].*$/, "");

      return cleanName;
    };
    await document.fonts.load(`16px ${getFontName(selectedFont)}`);
    console.log(selectedFont, getFontName(selectedFont));
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
  const handleThemeClick = async (background) => {
    console.log(background);
    if (selectCanvas) {
      fabric.Image.fromURL(
        background.imgUrl,
        (img) => {
          if (background.imgUrl.startsWith("https")) {
            img.set({ crossOrigin: "anonymous" });
          }
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
        },
        { crossOrigin: "anonymous" }
      );
    }
  };
  const handleImageSelect = (imageUrl) => {
    if (selectCanvas) {
      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          if (imageUrl.startsWith("https")) {
            img.set({ crossOrigin: "anonymous" });
          }
          const desiredHeight = 200; // 원하는 세로 크기
          img.scaleToHeight(desiredHeight);
          img.set({
            left: selectCanvas.getWidth() / 2,
            top: selectCanvas.getHeight() / 2,
            originX: "center",
            originY: "center",
          });
          selectCanvas.add(img);
          selectCanvas.renderAll();
        },
        { crossOrigin: "anonymous" }
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
  const filteredBackgrounds = selectedColor
    ? Object.values(backgrounds[selectedColor] || [])
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
            <WallPaperComp
              backgrounds={
                filteredBackgrounds ? filteredBackgrounds : backgrounds
              }
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
        return (
          <ThemeComp themes={themes["NONE"]} onImageClick={handleThemeClick} />
        ); // 테마 컴포지션
      case 4:
        return <ImageComp onImageSelect={handleImageSelect} />;
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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAfterSave = async () => {
    try {
      // 배경 이미지가 없는 경우 기본 이미지를 설정
      if (!selectCanvas.backgroundImage) {
        const defaultImage = backgrounds["WHITE"].find(
          (img) => img.resourceId == 1
        );

        if (defaultImage) {
          // handleImageClick이 완료될 때까지 대기
          await handleImageClick(defaultImage);

          // 일정 시간 대기 (예: 1초)
          await sleep(1000);
        } else {
          throw new Error("Default background image not found.");
        }
      }

      // handleImageClick이 완료되고 대기 후 다이어리 저장 로직 실행
      const formData = await saveDiaryObject();
      let newId = "";

      if (diaryId) {
        console.log("다이어리 수정");
        await updateDiary(diaryId, formData);
      } else {
        console.log("다이어리 생성");
        newId = await addDiary(formData);
      }

      // 다이어리 저장 후 데이터 갱신 및 상세 페이지로 이동
      await fetchMonthlyDiaries();
      await moveToDetailPage(newId ? newId : diaryId);
    } catch (error) {
      console.error("Error saving diary object:", error);
    }
  };

  const logFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };
  const [scope, setScope] = useState("ALL");
  const [stampId, setStampId] = useState(1);
  const saveDiaryObject = async () => {
    try {
      if (selectCanvas) {
        const json = selectCanvas.toJSON();
        const diaryImgUrl = selectCanvas.toDataURL({ format: "png" });
        const imageBlob = await fetch(diaryImgUrl).then((res) => res.blob());

        // 확인용 코드
        // console.log("diaryDate: ", diaryDate ? diaryDate : date);
        // console.log("contents: ", json);
        // console.log("scope: ", scope);
        // console.log("stamp: ", stampId);
        // console.log(diaryDate, date)
        // console.log(diary)
        const formData = new FormData();
        const dto = {
          diaryDate: diaryDate ? diaryDate : diary.diaryDate,
          contents: json,
          scope: scope,
          stampId: stampId,
        };
        const dtoBlob = new Blob([JSON.stringify(dto)], {
          type: "application/json",
        });
        formData.append("file", imageBlob, "canvas.png");
        formData.append("dto", dtoBlob);

        // console.log("FormData contents:");
        // logFormData(formData);

        return formData;
      } else {
        throw new Error("selectCanvas is not defined.");
      }
    } catch (error) {
      console.error("Error saving diary object:", error.message);
      throw new Error("Error saving diary object: " + error.message);
    }
  };

  const moveToDetailPage = async (diaryId) => {
    try {
      if (diaryId) {
        // console.log(diaryId);
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
      // console.log("선택 해제");
      obj.selectable = false;
    }
    selectCanvas.renderAll();
    setIsDecorated(!isDecorated);
  };
  const removeBtn = async() => {
    if (selectCanvas) {
      const objectsToDelete = await selectCanvas.getActiveObjects();
      console.log(objectsToDelete);
  
      if (objectsToDelete.length > 0) {
        objectsToDelete.forEach((obj) => {
          selectCanvas.remove(obj);
        });
  
        selectCanvas.discardActiveObject(); // 선택된 상태를 해제
        selectCanvas.renderAll();
        console.log('삭제완료');
      }
    }
  }
  const deleteElem = (elem) => {
    if (selectCanvas){
      console.log('삭제')
      selectCanvas.remove(elem)
      selectCanvas.renderAll();
    }
  }
  return (
    <>
      <St.StampContainer onClick={() => handleToggle(isOn)}>
        {stampList.length > 0 && (
          <img
            style={{ width: "50px", height: "50px" }}
            src={
              stampId
                ? stampList.find((stamp) => stamp.stampId === stampId).imgUrl
                : stampList[0].imgUrl
            }
          ></img>
        )}
        {diaryId ? diary.diaryDate : diaryDate}
        <ToggleBtn>{toggle(isOn)}</ToggleBtn>
      </St.StampContainer>
      <DiaryModal
        isOn={isOn}
        setIsOn={setIsOn}
        setScope={setScope}
        setStampId={setStampId}
      />
      <St.SaveBtn onClick={() => setIsSaveModalOpen(true)}>
        <St.IconContainer>
          <SaveIcon />
        </St.IconContainer>
        <St.IconFont>저장</St.IconFont>
      </St.SaveBtn>
      <St.Div $decorated={isDecorated}>
        <button
        ref={deleteBtnRef}
        onClick={() => removeBtn()}
        style={{ zIndex: "120", position: "absolute", display: "none" }}>
        <CloseSvg/>
        </button>
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
              <St.Btn
                $decorated={isDecorated}
                onClick={() => setIsExampleOn((prev) => !prev)}
              >
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
          onClose={() => setIsSaveModalOpen(false)}
          onButtonClick={handleAfterSave}
        />
        {isExampleOn && (
          <ExampleModal isOn={isExampleOn} setIsOn={setIsExampleOn} />
        )}
      </St.Div>
    </>
  );
};

export default WriteDiaryView;
