import React, { useState, useEffect } from "react";
import * as St from "./DiaryCompStyle";
import diaryTestImg from "@assets/DiaryTestImg.png";

const DiaryComp = ({ data, state }) => {
  // const [selectCanvas, setSelectCanvas] = useState(null);
  // const [mode, setMode] = useState(state || 'write');
  // const [comment, setComment] = useState(0);
  const { profileUrl, nickname, date, imageUrl, content, tags } = data;

  // date form 변경해주는 함수
  function formatDate(dateString) {
    // 날짜 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const formattedDate = formatDate(date);

  return (
    <St.Diary>
      <St.DiaryHeader>
        <St.Profile $profileUrl={profileUrl} />
        <St.TextContainer>
          <HeaderText>{nickname}</HeaderText>
          {/* <HeaderText>{formattedDate}</HeaderText> */}
        </St.TextContainer>
      </St.DiaryHeader>
      <St.DiaryContent>
        <St.DiaryImageContainer>
          <img src={diaryTestImg} />
        </St.DiaryImageContainer>
        {/* <DiaryDate>{formattedDate}</DiaryDate> */}
      </St.DiaryContent>
      <St.DiaryFooter>
        <St.BtnContainer>
          <St.BtnGroup>
            <St.Btn onClick={() => console.log("수정")}>수정</St.Btn>
            <St.Btn onClick={() => console.log("삭제")}>삭제</St.Btn>
          </St.BtnGroup>
          <St.BtnGroup>
            <St.Btn
              onClick={() => console.log("공유")}
              bgcolor={"#262F66"}
              color={"white"}
            >
              공유
            </St.Btn>
          </St.BtnGroup>
        </St.BtnContainer>
      </St.DiaryFooter>
    </St.Diary>
  );
};

export default DiaryComp;
