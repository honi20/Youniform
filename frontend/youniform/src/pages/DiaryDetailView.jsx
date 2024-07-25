import React from 'react'
import styled from 'styled-components';
import DiaryComp from '../components/Diary/DiaryComp';

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: column; /* 수직 정렬 */
    align-items: center;
    /* justify-content: center; */
    margin-top: 50px;
    border: 1px solid blue;
    height: 80%;
`

// test props
const data = {
    profileUrl: '../../assets/testImg2.png',
    nickname: 'honi',
    date: 'Tue Jul 02 2024 00:00:00 GMT+0900',
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
