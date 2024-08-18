import React, { useState, useEffect, useRef } from "react";
import Calendar from "@components/Diary/Calendar";
import styled from "styled-components";
import DiaryFriendsList from "@components/Diary/DiaryFriendsList";
import { useLocation, useNavigate } from "react-router-dom";
import useDiaryStore from "@stores/diaryStore";

const DiaryHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const FriendsContainer = styled.div`
  height: 100px;
`;

const CalendarContainer = styled.div`
  height: calc(100% - 170px);
  max-height: 620px;
`;

const DiaryHomeView = () => {
  const [calendarHeight, setCalendarHeight] = useState("auto");
  const { selectedUser, setSelectedUser } = useDiaryStore(state => ({
    selectedUser: state.selectedUser,
    setSelectedUser: state.setSelectedUser
  }));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const diaryHomeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCalendarHeight = () => {
      if (diaryHomeRef.current) {
        const diaryHomeHeight = diaryHomeRef.current.offsetHeight;
        setCalendarHeight(`${diaryHomeHeight - 220}px`);
      }
    };

    updateCalendarHeight();
    window.addEventListener("resize", updateCalendarHeight);

    return () => {
      window.removeEventListener("resize", updateCalendarHeight);
    };
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user ? user.friendId : null); // 친구가 선택되지 않으면 0으로 설정
    setCurrentMonth(new Date()); // 현재 월로 설정
  };

  return (
    <DiaryHome ref={diaryHomeRef}>
      <FriendsContainer>
        <DiaryFriendsList onUserClick={handleUserClick} />
      </FriendsContainer>
      <CalendarContainer>
        <Calendar
          user={selectedUser}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </CalendarContainer>
    </DiaryHome>
  );
};

export default DiaryHomeView;
