import React, { useEffect, useState, useRef } from 'react';
import Calendar from '../components/Diary/Calendar';
import styled from 'styled-components';
import DiaryFriendsList from '../components/Diary/DiaryFriendsList';
import useDiaryStore from '@stores/diaryStore';
import useFriendStore from '@stores/friendStore';

// 더미 데이터
import Stamp1 from "../assets/stickers/stamps/stamp_1.png";
import Stamp2 from "../assets/stickers/stamps/stamp_2.png";
import Stamp3 from "../assets/stickers/stamps/stamp_3.png";
import Stamp4 from "../assets/stickers/stamps/stamp_4.png";
import Stamp5 from "../assets/stickers/stamps/stamp_5.png";
import Stamp6 from "../assets/stickers/stamps/stamp_6.png";
import Stamp7 from "../assets/stickers/stamps/stamp_7.png";
import Stamp8 from "../assets/stickers/stamps/stamp_8.png";
import Stamp9 from "../assets/stickers/stamps/stamp_9.png";
import Stamp10 from "../assets/stickers/stamps/stamp_10.png";

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
    stamps: [ // 7
      { date: '2024-08-04', stampSrc: stampSrc[4] },
      { date: '2024-08-06', stampSrc: stampSrc[0] },
      { date: '2024-08-13', stampSrc: stampSrc[1] },
      { date: '2024-08-16', stampSrc: stampSrc[5] },
      { date: '2024-08-18', stampSrc: stampSrc[7] },
      { date: '2024-08-27', stampSrc: stampSrc[8] },
      { date: '2024-08-28', stampSrc: stampSrc[9] },
    ],
  },
  {
    id: 2,
    stamps: [ // 5
      { date: '2024-08-01', stampSrc: stampSrc[3] },
      { date: '2024-08-02', stampSrc: stampSrc[4] },
      { date: '2024-08-06', stampSrc: stampSrc[5] },
      { date: '2024-08-09', stampSrc: stampSrc[6] },
      { date: '2024-08-15', stampSrc: stampSrc[7] },
    ],
  },
  {
    id: 3,
    stamps: [ // 2
      { date: '2024-08-11', stampSrc: Stamp2 },
      { date: '2024-08-20', stampSrc: Stamp1 },
    ],
  },
  {
    id: 4,
    stamps: [
      { date: "2024-08-02", stampSrc: Stamp1 },
      { date: "2024-08-03", stampSrc: Stamp2 },
      { date: "2024-08-13", stampSrc: Stamp3 },
      { date: "2024-08-17", stampSrc: Stamp4 },
      { date: "2024-08-18", stampSrc: Stamp5 },
      { date: "2024-08-23", stampSrc: Stamp6 },
      { date: "2024-08-28", stampSrc: Stamp7 },
    ],
  },
  {
    id: 5,
    stamps: [
      { date: "2024-08-06", stampSrc: Stamp9 },
      { date: "2024-08-16", stampSrc: Stamp10 },
      { date: "2024-08-21", stampSrc: Stamp2 },
      { date: "2024-08-29", stampSrc: Stamp1 },
    ],
  },
  {
    id: 6,
    stamps: [
      { date: "2024-08-18", stampSrc: Stamp4 },
      { date: "2024-08-28", stampSrc: Stamp1 },
      { date: "2024-08-30", stampSrc: Stamp3 },
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
`;

const DiaryHomeView = () => {
  const [calendarHeight, setCalendarHeight] = useState("auto");
  const [selectedUser, setSelectedUser] = useState(0);
  const diaryHomeRef = useRef(null);
  const { diaries, fetchDiaries, monthlyDiaries, fetchMonthlyDiaries } = useDiaryStore();
  const { friends } = useFriendStore();

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    // 월은 0부터 시작, padStart(month 두 자릿수 보장)
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${year}-${month}`;
    fetchMonthlyDiaries(formattedDate);
  }, [fetchMonthlyDiaries]);

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
      window.removeEventListener("resize", updateCalendarHeight);
    };
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log(user);
  };
  
  const filteredStamps = selectedUser
  ? friends.find(friend => friend.friendId === selectedUser.friendId)?.imgUrl || []
    : userCalInfo[0]?.imgUrl || []; 

  return (
    <DiaryHome ref={diaryHomeRef}>
      <FriendsContainer>
        <DiaryFriendsList onUserClick={handleUserClick} />
      </FriendsContainer>
      <CalendarContainer style={{ height: calendarHeight }}>
        <Calendar user={selectedUser} stamps={filteredStamps} />
      </CalendarContainer>
    </DiaryHome>
  );
};

export default DiaryHomeView;
