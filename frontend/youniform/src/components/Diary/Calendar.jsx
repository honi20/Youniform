import React, { useState, useEffect } from 'react';
import { format, subMonths, addMonths, subYears, addYears } from 'date-fns';
import useDiaryStore from '@stores/diaryStore';
import styled from 'styled-components';
import RenderMonth from './Calendar/RenderMonth';
import RenderDays from './Calendar/RenderDays';
import RenderCells from './Calendar/RenderCells';

const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #F9F9F9;
  padding: 10px;
`;

const CalendarBox = styled.div`
  height: 100%;
  margin: 0 auto;
  border: 2px solid #787878;
  border-radius: 15px;
  background-color: white;
  overflow: hidden;
`;

const Calendar = ({ user, currentMonth, setCurrentMonth }) => {
  const { selectedUser, fetchFriendsDiaries, fetchMonthlyDiaries } = useDiaryStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const formattedDate = `${format(currentMonth, 'yyyy')}-${format(currentMonth, 'MM')}`;
    
    if (selectedUser !== null) {
      // console.log(`selectedUser: ${selectedUser}`);
      // console.log(`formattedDate: ${formattedDate}`);
      fetchFriendsDiaries(selectedUser, formattedDate);
    } else if (selectedUser === null) {
      // console.log(`formattedDate: ${formattedDate}`);
      fetchMonthlyDiaries(formattedDate);
    }
  }, [currentMonth, selectedUser]);

  useEffect(() => {
  }, []);

  const prevMonth = () => {
    // console.log(`before month: ${currentMonth}`);
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleYearSelect = (newDate) => {
    setCurrentMonth(new Date(newDate.getFullYear(), currentMonth.getMonth()));
  };

  const handleMonthSelect = (month) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month - 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <CalendarContainer>
      <CalendarBox>
        <RenderMonth
          curMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          onYearSelect={handleYearSelect}
          onMonthSelect={handleMonthSelect}
        />
        <RenderDays />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          user={user}
        />
      </CalendarBox>
    </CalendarContainer>
  );
};

export default Calendar;
