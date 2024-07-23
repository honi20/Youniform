import React from 'react'
import styled from 'styled-components';
import DiaryComp from '../components/Diary/DiaryComp';

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: column; /* 수직 정렬 */
    align-items: center;
    /* justify-content: center; */
    margin-top: 40px;
`

// test props
const profileData = {
    imageUrl: '../../assets/testImg2.png',
    nickname: 'honi',
    date: 'Tue Jul 02 2024 00:00:00 GMT+0900',
};

const DiaryDetailView = () => {
    return (
    <Div>
      <div>Diary Detail View</div>
      <DiaryComp
        state='edit'
        profileData={profileData}/>
    </Div>
  )
}

export default DiaryDetailView
