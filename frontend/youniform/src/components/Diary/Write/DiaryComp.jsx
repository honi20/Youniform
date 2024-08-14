import React, { useState, useEffect  } from "react";
import * as St from "./DiaryCompStyle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useDiaryStore from "@stores/diaryStore";
import BasicModal from "@components/Modal/BasicModal";
import ShareModal from "@components/Modal/ShareModal";

const ImageContainer = styled.div`
  height: 502px;
  width: 302px;
`;

const DiaryComp = ({ state, diary }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { deleteDiary } = useDiaryStore();

  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const handleDeleteBtn = async (diaryId) => {
    console.log("다이어리 삭제", diaryId);
    await deleteDiary(diaryId);
    navigate("/diary");
  };

  const handleButtonClick = (index) => {
    switch (index) {
      case 1:
        console.log("Button 1 clicked");
        // 추가 작업
        break;
      case 2:
        console.log("Button 2 clicked");
        // 추가 작업
        break;
      case 3:
        console.log("Button 3 clicked");
        handleDeleteBtn(diary.diaryId);
        break;
      default:
        console.log("Unknown button clicked");
        break;
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };

  return (
    <St.Diary>
      <St.DiaryHeader>
        <St.Profile src={diary.profileUrl} />
        <St.TextContainer>
          <St.HeaderText>{diary.nickname}</St.HeaderText>
        </St.TextContainer>
        <St.DiaryDate>
          {diary?.diaryDate && formatDate(diary.diaryDate)}
        </St.DiaryDate>
      </St.DiaryHeader>
      <St.DiaryContent>
        <ImageContainer>
          <img src={diary.diaryImgUrl} alt="Diary Image" />
        </ImageContainer>
      </St.DiaryContent>
      <St.DiaryFooter>
        <St.BtnContainer>
          <St.BtnGroup>
            <St.Btn onClick={() => navigate("./update")}>수정</St.Btn>
            <St.Btn onClick={() => setIsModalOpen(true)}>삭제</St.Btn>
          </St.BtnGroup>
          <St.BtnGroup>
            <St.Btn onClick={openShareModal} $isShare={true}>
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
      <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
    </St.Diary>
  );
};

export default DiaryComp;
