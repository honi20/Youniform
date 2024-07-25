import React, { useEffect, useState, useRef } from 'react';
import Calendar from '../components/Calendar';
import styled from 'styled-components';
import DiaryFriendsList from '../components/Diary/DiaryFriendsList';

const DiaryHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 49px;
  `;
  
  const FriendsContainer = styled.div`
    height: 100px;
  `;
  
  const CalendarContainer = styled.div`
    height: 100%;
    // background-color : red;
    border: 1px solid red;
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
    console.log(user);
    setSelectedUser(user);
  };

  return (
    <DiaryHome ref={diaryHomeRef}>
      <FriendsContainer>
        <DiaryFriendsList onUserClick={handleUserClick}/>
      </FriendsContainer>
      <CalendarContainer style={{ height: calendarHeight }}>
        <Calendar user={selectedUser}/>
      </CalendarContainer>
    </DiaryHome>
  );
};

export default DiaryHomeView;
