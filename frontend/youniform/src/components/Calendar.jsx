import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { format, addMonths, subMonths, setYear } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';

import * as fabric from "fabric"; 

// icon components
import SvgIcon from "@mui/material/SvgIcon";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const CalendarBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  margin: 0 auto;
  background-color: #F8F8F8;
`;

const MonthRow = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-between;
  align-items: center;
`;

const DaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
`;

const DayColumn = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
`;

const SelectBox = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
`;

const CellsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
`;

const Cell = styled.div`
  border: 1px solid #ddd;
  height: 60px;
  display: flex;
  padding: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  
  &.disabled {
    background-color: #f0f0f0;
  }

  &.selected {
    color: red;
  }

  &.not-valid {
    color: #ddd;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 180%;
  left: -20%;
  transform: translateX(-50%);
  width: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;
  padding: 10px;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const RenderMonth = ({ curMonth, prevMonth, nextMonth, onYearSelect, onMonthSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleYearSelect = (year) => {
    onYearSelect(year);
    setShowDropdown(false);
  };

  const handleMonthSelect = (month) => {
    onMonthSelect(month);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const koMonths = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <MonthRow>
      <div>●●●</div>
      <div onClick={prevMonth}>◀</div>
      <SelectBox onClick={toggleDropdown}>
        <span className="text">
          <span className='text year'>
            {format(curMonth, 'yyyy')}년
          </span>
          <span className="text month">
            {format(curMonth, 'M')}월
          </span>
        </span>
        {showDropdown && (
          <Dropdown ref={dropdownRef}>
            <div>
              <SvgIcon component={KeyboardArrowLeftIcon} />
              <span>{format(curMonth, 'yyyy')}</span>
              <SvgIcon component={KeyboardArrowRightIcon} />
            </div>
            <MonthGrid>
              {koMonths.map((month, index) => (
                <DropdownItem key={index} onClick={() => handleMonthSelect(index + 1)}>
                  {month}
                </DropdownItem>
              ))}
            </MonthGrid>
          </Dropdown>
        )}
      </SelectBox>
      <div onClick={nextMonth}>▶</div>
    </MonthRow>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <DayColumn key={i}>
        {date[i]}
      </DayColumn>
    );
  }

  return <DaysRow>{days}</DaysRow>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = new Date(day);
      days.push(
        <Cell
          className={`cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'selected'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }
          >
            {formattedDate}
          </span>
        </Cell>
      );
      day = addDays(day, 1);
    }
    rows.push(...days);
    days = [];
  }
  return <CellsContainer>{rows}</CellsContainer>;
};

const Calendar = () => {
  const [curMonth, setCurMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurMonth(subMonths(curMonth, 1));
  };

  const nextMonth = () => {
    setCurMonth(addMonths(curMonth, 1));
  };

  const prevYear = () => {
    setCurMonth(setYear(curMonth, curMonth.getFullYear() - 1));
  };

  const nextYear = () => {
    setCurMonth(setYear(curMonth, curMonth.getFullYear() + 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleMonthSelect = (month) => {
    setCurMonth(new Date(curMonth.getFullYear(), month - 1));
  };

  return (
    <>
      <CalendarBox>
        <RenderMonth
          curMonth={curMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          onMonthSelect={handleMonthSelect}
        />
        <RenderDays />
        <div className='test'>
          <RenderCells
            currentMonth={curMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
          />
        </div>
      </CalendarBox>
    </>
  );
};

export default Calendar;
