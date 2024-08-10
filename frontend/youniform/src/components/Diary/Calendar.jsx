import React, { useState } from 'react';
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

const Calendar = ({ stamps }) => {
  const { fetchMonthlyDiaries } = useDiaryStore();
  const [curMonth, setCurMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurMonth(subMonths(curMonth, 1));
    const formattedDate = `${format(curMonth, 'yyyy')}-${format(curMonth, 'MM')}`;
    fetchMonthlyDiaries(formattedDate);
  };

  const nextMonth = () => {
    setCurMonth(addMonths(curMonth, 1));
  };

  const handleYearSelect = (newDate) => {
    setCurMonth(new Date(newDate.getFullYear(), curMonth.getMonth()));
  };

  const handleMonthSelect = (month) => {
    setCurMonth(new Date(curMonth.getFullYear(), month - 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <CalendarContainer>
      <CalendarBox>
        <RenderMonth
          curMonth={curMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          onYearSelect={handleYearSelect}
          onMonthSelect={handleMonthSelect}
        />
        <RenderDays />
        <RenderCells
          currentMonth={curMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          stamps={stamps}
        />
      </CalendarBox>
    </CalendarContainer>
  );
};

export default Calendar;
