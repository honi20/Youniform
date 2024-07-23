import React, { useState } from 'react';
import { Diary, DiaryHeader, Btn, WriteBtnContainer, EditBtnContainer, BtnGroup,
    Profile, HeaderText, Header } from './DiaryCompStyle';

// router에 따라서 BTN CONTAINER 변경할 예정

const DiaryComp = ({ profileData, state }) => {
    const [mode, setMode] = useState(state || 'write');

    const { imageUrl, nickname, date } = profileData;

    // date form 변경해주는 함수
    function formatDate(dateString) {
        // 날짜 문자열을 Date 객체로 변환
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        return `${year}년 ${month}월 ${day}일`;
    }
    
    const formattedDate = formatDate(date);
    
    return (
        <Diary>
            <DiaryHeader>
                <Profile $imageUrl={imageUrl} />
                <Header>
                    <HeaderText>{nickname}</HeaderText>
                    <HeaderText>{formattedDate}</HeaderText>
                </Header>
            </DiaryHeader>
            {
                mode == 'write'
                ? (
                    <WriteBtnContainer>
                        <BtnGroup>
                            <Btn>초기화</Btn>
                        </BtnGroup>
                    </WriteBtnContainer>
                ) : (
                    <EditBtnContainer>
                        <BtnGroup>
                            <Btn>수정</Btn>
                            <Btn>삭제</Btn>
                        </BtnGroup>
                        <BtnGroup>
                            <Btn>공유</Btn>
                        </BtnGroup>
                    </EditBtnContainer>
                )
            }
        </Diary>
  );
}

export default DiaryComp
