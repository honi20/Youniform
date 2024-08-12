import { useEffect, useState, useRef } from 'react';
import Calendar from '../components/Diary/Calendar';
import styled from 'styled-components';
import DiaryFriendsList from '../components/Diary/DiaryFriendsList';

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
  const [currentMonth, setCurrentMonth] = useState(new Date());
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
      window.removeEventListener("resize", updateCalendarHeight);
    };
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log(user);
    setCurrentMonth(new Date()); // 현재 월로 설정
  };
  
  return (
    <DiaryHome ref={diaryHomeRef}>
      <FriendsContainer>
        <DiaryFriendsList onUserClick={handleUserClick} />
      </FriendsContainer>
      <CalendarContainer style={{ height: calendarHeight }}>
        <Calendar
          user={selectedUser}
          currentMonth={currentMonth} // 현재 월을 Calendar에 전달
          setCurrentMonth={setCurrentMonth} // Calendar에서 월을 업데이트할 수 있도록
        />
      </CalendarContainer>
    </DiaryHome>
  );
};

export default DiaryHomeView;
