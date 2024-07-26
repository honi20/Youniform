import React, { useState, useEffect } from 'react';
import { Diary, DiaryHeader, Btn, BtnGroup, BtnContainer,
    Profile, HeaderText, TextContainer, 
    DiaryImageContainer, DiaryImage, DiaryText, DiaryTags, DiaryDate,
    DiaryContent, DiaryLine, DiaryFooter,  } from './DiaryCompStyle';
import ChatIcon from '../../assets/Chat.svg?react';
import FavoriteIcon from '../../assets/FavoriteLight.svg?react';
import BellIcon from '../../assets/Bell.svg?react';
import styled from 'styled-components';
import { fabric } from "fabric";
import diaryTestImg from '../../assets/DiaryTestImg.png'

const DiaryComp = ({ data, state }) => {
    // const [selectCanvas, setSelectCanvas] = useState(null);
    // const [mode, setMode] = useState(state || 'write');
    // const [comment, setComment] = useState(0);
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
                    
                </TextContainer>
            </DiaryHeader>
            <DiaryContent>
                <DiaryImageContainer>
                    <img src={diaryTestImg}/>
                </DiaryImageContainer>
                {/* <DiaryDate>{formattedDate}</DiaryDate> */}
            </DiaryContent>
            <DiaryFooter>
                <BtnContainer>
                        <BtnGroup>
                            <Btn onClick={() => console.log('수정')}>수정</Btn>
                            <Btn onClick={() => console.log('삭제')}>삭제</Btn>
                        </BtnGroup>
                        <BtnGroup>
                            <Btn
                                onClick={() => console.log('공유')}
                                bgcolor={'#262F66'}
                                color={'white'}
                            >공유</Btn>
                        </BtnGroup>
                    </BtnContainer>
            </DiaryFooter>
        </Diary>
  );
}

export default DiaryComp
