import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import DiaryComp from '../components/Diary/DiaryComp';
// import ProfileUrl from '../assets/profile.png?react';

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: column; /* 수직 정렬 */
    align-items: center;
    /* justify-content: center; */
    margin-top: 50px;
    /* border: 1px solid blue; */
    height: auto;
`

// test props
const data = {
    profileUrl: '',
    nickname: '하츄핑',
    date: 'Tue Jul 26 2024 00:00:00 GMT+0900',
    imageUrl: '../../assets/doyeong.png',
    content: '기아 우승 기념 도영이 다꾸를 해보아따!',
    tags: [
      { index:1, tag: '김도영' },
      { index: 2, tag: '기아' },
      { index: 3, tag: '도영이' },
    ]
};

const DiaryDetailView = () => {
  

  
    return (
    <Div>
      <DiaryComp
        state='write'
        data={data}/>
    </Div>
  )
}

export default DiaryDetailView
