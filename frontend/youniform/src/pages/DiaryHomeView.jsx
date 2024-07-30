import React, { useEffect, useState, useRef } from 'react';
import Calendar from '../components/Diary/Calendar';
import styled from 'styled-components';
import DiaryFriendsList from '../components/Diary/DiaryFriendsList';

// 추후 삭제
import Sticker1 from '../assets/Test/Sticker/sticker_1.png'
import Sticker2 from '../assets/Test/Sticker/sticker_2.png'
import Sticker3 from '../assets/Test/Sticker/sticker_3.png'
import Sticker4 from '../assets/Test/Sticker/sticker_4.png'
import Sticker5 from '../assets/Test/Sticker/sticker_5.png'
import Sticker6 from '../assets/Test/Sticker/sticker_6.png'
import Sticker7 from '../assets/Test/Sticker/sticker_7.png'
import Sticker8 from '../assets/Test/Sticker/sticker_8.png'
import Sticker9 from '../assets/Test/Sticker/sticker_9.png'
import Sticker10 from '../assets/Test/Sticker/sticker_10.png'

// 더미 데이터
const stickerSrc = [
  "src/assets/Test/Sticker/sticker_1.png", "src/assets/Test/Sticker/sticker_2.png",
  "src/assets/Test/Sticker/sticker_3.png", "src/assets/Test/Sticker/sticker_4.png",
  "src/assets/Test/Sticker/sticker_5.png", "src/assets/Test/Sticker/sticker_6.png",
  "src/assets/Test/Sticker/sticker_7.png", "src/assets/Test/Sticker/sticker_8.png",
  "src/assets/Test/Sticker/sticker_9.png", "src/assets/Test/Sticker/sticker_10.png",
]
const userCalInfo = [
  {
    id: 1,
    stickers: [
      { date: '2024-07-04', stickerSrc: stickerSrc[4] },
      { date: '2024-07-06', stickerSrc: stickerSrc[0] },
      { date: '2024-07-13', stickerSrc: stickerSrc[1] },
      { date: '2024-07-16', stickerSrc: stickerSrc[5] },
      { date: '2024-07-18', stickerSrc: stickerSrc[7] },
      { date: '2024-07-27', stickerSrc: stickerSrc[8] },
      { date: '2024-07-28', stickerSrc: stickerSrc[9] },
    ],
  },
  {
    id: 2,
    stickers: [
      { date: '2024-07-01', stickerSrc: Sticker3 },
      { date: '2024-07-02', stickerSrc: Sticker4 },
      { date: '2024-07-06', stickerSrc: Sticker5 },
      { date: '2024-07-09', stickerSrc: Sticker6 },
      { date: '2024-07-15', stickerSrc: Sticker7 },
    ],
  },
  {
    id: 3,
    stickers: [
      { date: '2024-07-11', stickerSrc: Sticker2 },
      { date: '2024-07-20', stickerSrc: Sticker1 },
    ],
  },
  {
    id: 4,
    stickers: [
      { date: '2024-07-02', stickerSrc: Sticker1 },
      { date: '2024-07-03', stickerSrc: Sticker2 },
      { date: '2024-07-13', stickerSrc: Sticker3 },
      { date: '2024-07-17', stickerSrc: Sticker4 },
      { date: '2024-07-18', stickerSrc: Sticker5 },
      { date: '2024-07-23', stickerSrc: Sticker6 },
      { date: '2024-07-28', stickerSrc: Sticker7 },
    ],
  },
  {
    id: 5,
    stickers: [
      { date: '2024-07-06', stickerSrc: Sticker9 },
      { date: '2024-07-16', stickerSrc: Sticker10 },
      { date: '2024-07-21', stickerSrc: Sticker2 },
      { date: '2024-07-29', stickerSrc: Sticker1 },
    ],
  },
  {
    id: 6,
    stickers: [
      { date: '2024-07-18', stickerSrc: Sticker4 },
      { date: '2024-07-28', stickerSrc: Sticker1 },
      { date: '2024-07-30', stickerSrc: Sticker3 },
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
  const [selectedUser, setSelectedUser] = useState(null);
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

  const filteredStickers = selectedUser
    ? userCalInfo.find(userItem => userItem.id === selectedUser.id)?.stickers || []
    : userCalInfo[0]?.stickers || []; 

  return (
    <DiaryHome ref={diaryHomeRef}>
      <FriendsContainer>
        <DiaryFriendsList onUserClick={handleUserClick}/>
      </FriendsContainer>
      <CalendarContainer style={{ height: calendarHeight }}>
        <Calendar user={selectedUser} stickers={filteredStickers}/>
      </CalendarContainer>
    </DiaryHome>
  );
};

export default DiaryHomeView;
