import React, { useEffect, useState, useRef } from 'react';
import Calendar from '../components/Diary/Calendar';
import styled from 'styled-components';
import DiaryFriendsList from '../components/Diary/DiaryFriendsList';

// 더미 데이터
import Stamp1 from '../assets/stickers/stamps/stamp_1.png'
import Stamp2 from '../assets/stickers/stamps/stamp_2.png'
import Stamp3 from '../assets/stickers/stamps/stamp_3.png'
import Stamp4 from '../assets/stickers/stamps/stamp_4.png'
import Stamp5 from '../assets/stickers/stamps/stamp_5.png'
import Stamp6 from '../assets/stickers/stamps/stamp_6.png'
import Stamp7 from '../assets/stickers/stamps/stamp_7.png'
import Stamp8 from '../assets/stickers/stamps/stamp_8.png'
import Stamp9 from '../assets/stickers/stamps/stamp_9.png'
import Stamp10 from '../assets/stickers/stamps/stamp_10.png'

// 더미 데이터
const stampSrc = [
  "src/assets/stickers/stamps/stamp_1.png",
  "src/assets/stickers/stamps/stamp_2.png",
  "src/assets/stickers/stamps/stamp_3.png",
  "src/assets/stickers/stamps/stamp_4.png",
  "src/assets/stickers/stamps/stamp_5.png", 
  "src/assets/stickers/stamps/stamp_6.png",
  "src/assets/stickers/stamps/stamp_7.png",
  "src/assets/stickers/stamps/stamp_8.png",
  "src/assets/stickers/stamps/stamp_9.png",
  "src/assets/stickers/stamps/stamp_10.png",
];

const userCalInfo = [
  {
    id: 1,
    stamps: [
      { date: '2024-07-04', stampSrc: stampSrc[4] },
      { date: '2024-07-06', stampSrc: stampSrc[0] },
      { date: '2024-07-13', stampSrc: stampSrc[1] },
      { date: '2024-07-16', stampSrc: stampSrc[5] },
      { date: '2024-07-18', stampSrc: stampSrc[7] },
      { date: '2024-07-27', stampSrc: stampSrc[8] },
      { date: '2024-07-28', stampSrc: stampSrc[9] },
    ],
  },
  {
    id: 2,
    stamps: [
      { date: '2024-07-01', stampSrc: stampSrc[3] },
      { date: '2024-07-02', stampSrc: stampSrc[4] },
      { date: '2024-07-06', stampSrc: stampSrc[5] },
      { date: '2024-07-09', stampSrc: stampSrc[6] },
      { date: '2024-07-15', stampSrc: stampSrc[7] },
    ],
  },
  {
    id: 3,
    stamps: [
      { date: '2024-07-11', stampSrc: Stamp2 },
      { date: '2024-07-20', stampSrc: Stamp1 },
    ],
  },
  {
    id: 4,
    stamps: [
      { date: '2024-07-02', stampSrc: Stamp1 },
      { date: '2024-07-03', stampSrc: Stamp2 },
      { date: '2024-07-13', stampSrc: Stamp3 },
      { date: '2024-07-17', stampSrc: Stamp4 },
      { date: '2024-07-18', stampSrc: Stamp5 },
      { date: '2024-07-23', stampSrc: Stamp6 },
      { date: '2024-07-28', stampSrc: Stamp7 },
    ],
  },
  {
    id: 5,
    stamps: [
      { date: '2024-07-06', stampSrc: Stamp9 },
      { date: '2024-07-16', stampSrc: Stamp10 },
      { date: '2024-07-21', stampSrc: Stamp2 },
      { date: '2024-07-29', stampSrc: Stamp1 },
    ],
  },
  {
    id: 6,
    stamps: [
      { date: '2024-07-18', stampSrc: Stamp4 },
      { date: '2024-07-28', stampSrc: Stamp1 },
      { date: '2024-07-30', stampSrc: Stamp3 },
    ],
  },
];

const DiaryHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  `;
  
  const FriendsContainer = styled.div`
    height: 100px;
  `;
  
  const CalendarContainer = styled.div`
    height: 100%;
    // background-color : red;
`;

const DiaryHomeView = () => {
  const [calendarHeight, setCalendarHeight] = useState('auto');
  const [selectedUser, setSelectedUser] = useState(0);
  const diaryHomeRef = useRef(null);

  useEffect(() => {
    const updateCalendarHeight = () => {
      if (diaryHomeRef.current) {
        const diaryHomeHeight = diaryHomeRef.current.offsetHeight;
        setCalendarHeight(`${diaryHomeHeight - 220}px`);
      }
    };

    updateCalendarHeight();
    window.addEventListener('resize', updateCalendarHeight);

    return () => {
      window.removeEventListener('resize', updateCalendarHeight);
    };
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const filteredStamps = selectedUser
    ? userCalInfo.find(userItem => userItem.id === selectedUser.id)?.stamps || []
    : userCalInfo[0]?.stamps || []; 

  return (
    <DiaryHome ref={diaryHomeRef}>
      <FriendsContainer>
        <DiaryFriendsList onUserClick={handleUserClick}/>
      </FriendsContainer>
      <CalendarContainer style={{ height: calendarHeight }}>
        <Calendar user={selectedUser} stamps={filteredStamps}/>
      </CalendarContainer>
    </DiaryHome>
  );
};

export default DiaryHomeView;
