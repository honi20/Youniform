import React, { useState, useEffect } from "react";
import * as St from "./DiaryCompStyle";
// import diaryTestImg from "@assets/DiaryTestImg.png";
import styled from "styled-components";
import CanvasComp from "@components/Diary/Write/DiaryComp";
import { useNavigate } from "react-router-dom";

const ImageContainer = styled.div`
  height: 502px;
  width: 302px;
  border: 1px solid black;
`;
const DiaryComp = ({ state, diary }) => {
  const [selectCanvas, setSelectCanvas] = useState(null);
  const [isDecorated, setIsDecorated] = useState(false);
  const navigate = useNavigate();
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // const formattedDate = formatDate(diary.diaryDate);
  console.log(diary);
  return (
    <St.Diary>
      <St.DiaryHeader>
        <St.Profile $profileUrl={diary.profileUrl} />
        <St.TextContainer>
          <St.HeaderText>{diary.nickname}</St.HeaderText>
        </St.TextContainer>
      </St.DiaryHeader>
      <St.DiaryContent>
        <ImageContainer>
          <CanvasComp
            selectCanvas={selectCanvas}
            setSelectCanvas={setSelectCanvas}
            decorated={isDecorated}
            diary={diary.contents}
          />
        </ImageContainer>
      </St.DiaryContent>
      <St.DiaryFooter>
        <St.BtnContainer>
          <St.BtnGroup>
            <St.Btn onClick={() => navigate("./update")}>수정</St.Btn>
            <St.Btn onClick={() => console.log("삭제")}>삭제</St.Btn>
          </St.BtnGroup>
          <St.BtnGroup>
            <St.Btn onClick={() => console.log("공유")} $isShare={true}>
              공유
            </St.Btn>
          </St.BtnGroup>
        </St.BtnContainer>
      </St.DiaryFooter>
    </St.Diary>
  );
};

export default DiaryComp;
