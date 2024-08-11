import React, { useState, useEffect } from "react";
import * as St from "./DiaryCompStyle";
// import diaryTestImg from "@assets/DiaryTestImg.png";
import styled from "styled-components";
// import CanvasComp from "@components/Diary/Write/DiaryComp";
import { useNavigate } from "react-router-dom";
import useDiaryStore from "@stores/diaryStore";
import BasicModal from "@components/Modal/BasicModal";
const ImageContainer = styled.div`
  height: 502px;
  width: 302px;
  border: 1px solid black;
`;
const DiaryComp = ({ state, diary }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteDiary } = useDiaryStore();
  const handleDeleteBtn = async (diaryId) => {
    console.log("다이어리 삭제", diaryId)
    await deleteDiary(diaryId);
    navigate('/diary')
  }
  const handleButtonClick = (index) => {
    switch (index) {
      case 1:
        console.log('Button 1 clicked');
        // 추가 작업
        break;
      case 2:
        console.log('Button 2 clicked');
        // 추가 작업
        break;
      case 3:
        console.log('Button 3 clicked');
        handleDeleteBtn(diary.diaryId);
        break;
      default:
        console.log('Unknown button clicked');
        break;
    }
  };
  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const day = date.getDate().toString().padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // }

  console.log(diary);
  return (
    <St.Diary>
      <St.DiaryHeader>
        <St.Profile src={diary.profileUrl} />
        <St.TextContainer>
          <St.HeaderText>{diary.nickname}</St.HeaderText>
        </St.TextContainer>
      </St.DiaryHeader>
      <St.DiaryContent>
        <ImageContainer>
          <img src={diary.diaryImgUrl}/>
          {/* <CanvasComp
            selectCanvas={selectCanvas}
            setSelectCanvas={setSelectCanvas}
            decorated={isDecorated}
            diary={diary.contents}
          /> */}
        </ImageContainer>
      </St.DiaryContent>
      <St.DiaryFooter>
        <St.BtnContainer>
          <St.BtnGroup>
            <St.Btn onClick={() => navigate("./update")}>수정</St.Btn>
            <St.Btn onClick={() => setIsModalOpen(true)}>삭제</St.Btn>
          </St.BtnGroup>
          <St.BtnGroup>
            <St.Btn onClick={() => console.log("공유")} $isShare={true}>
              공유
            </St.Btn>
          </St.BtnGroup>
        </St.BtnContainer>
      </St.DiaryFooter>
      {isModalOpen && (
        <BasicModal
          state="DiaryDeleted"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onButtonClick={(index) => {
            handleButtonClick(index);
          }}
        />
      )}
    </St.Diary>
  );
};

export default DiaryComp;
