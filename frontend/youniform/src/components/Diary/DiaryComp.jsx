import React, { useState } from 'react';
import { Diary, DiaryHeader, Btn, BtnGroup,
    Profile, HeaderText, TextContainer, 
    DiaryImageContainer, DiaryImage, DiaryText, DiaryTags, DiaryDate,
    DiaryContent, DiaryLine, DiaryFooter,  } from './DiaryCompStyle';
import ChatIcon from '../../assets/Chat.svg?react';
import FavoriteIcon from '../../assets/FavoriteLight.svg?react';
import BellIcon from '../../assets/Bell.svg?react';
import styled from 'styled-components';

// data 임의로 만듦

const Icon = styled.div`
    margin: 0 10px;
    border: 1px solid black;
`
const DiaryComp = ({ data, state }) => {
    const [mode, setMode] = useState(state || 'write');
    const [comment, setComment] = useState(0);
    const {
        profileUrl,
        nickname,
        date,
        imageUrl,
        content,
        tags
    } = data;

    // date form 변경해주는 함수
    function formatDate(dateString) {
        // 날짜 문자열을 Date 객체로 변환
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }
    
    const formattedDate = formatDate(date);

    return (
        <Diary>
            <DiaryHeader>
                <Profile $profileUrl={profileUrl} />
                <TextContainer>
                    <HeaderText>{nickname}</HeaderText>
                    {/* <HeaderText>{formattedDate}</HeaderText> */}
                    <BtnGroup>
                        <Btn>수정</Btn>
                        <Btn>삭제</Btn>
                    </BtnGroup>
                </TextContainer>
            </DiaryHeader>
            <DiaryContent>
                <DiaryImageContainer>
                    {/* { console.log("test") } */}
                    <DiaryImage src={imageUrl}/>
                </DiaryImageContainer>
                <DiaryText/>
                <DiaryTags/>
                <DiaryDate>{formattedDate}</DiaryDate>
            </DiaryContent>
            <DiaryLine/>
            <DiaryFooter>
                <div>
                    <Icon>
                        <ChatIcon/>
                    </Icon>
                    <div>댓글 {comment}개 보기</div>
                </div>
                <div>
                    <Icon>
                        <FavoriteIcon/>
                    </Icon>
                    <Icon>
                        <BellIcon/>
                    </Icon>
                </div>
            </DiaryFooter>
        </Diary>
  );
}

export default DiaryComp
