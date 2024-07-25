import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { format, addMonths, addYears, subYears, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';

// icon components
import SvgIcon from "@mui/material/SvgIcon";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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

const MonthRow = styled.div`
  display: flex;
  width: 90%;
  height: 8%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;


const DaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 8%;
  margin: 0 auto;
  justify-content: space-between;
  border-top: 2px solid #787878;
  border-bottom: 2px solid #787878;
  align-items: center;
`;

const IconArea = styled.div`
  display: flex;
  gap: 5px;
`;

const CircleIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: #FFEAEE;
  border: 1.5px solid #787878;
  border-radius: 50%;
`;
const DayColumn = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 800;
  color: #787878;
`;

const SelectBox = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
`;

const CellsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 84%;
  margin: 0 auto;
  justify-content: space-between;
`;

const Cell = styled.div`
  color: #787878;
  border: 1px solid #ddd;
  height: 100%;
  padding: 5px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  
  &.disabled {
    background-color: #f0f0f0;
    pointer-events : none;
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

const RenderMonth = ({ curMonth, prevMonth, nextMonth, prevYear, nextYear, onYearSelect, onMonthSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleYearChange = (direction) => {
    if (direction === 'prev') {
      onYearSelect(subYears(curMonth, 1));
    } else if (direction === 'next') {
      onYearSelect(addYears(curMonth, 1));
    }
  };

  const handleMonthSelect = (month) => {
    onMonthSelect(month);
    setShowDropdown(false); // MonthGrid 클릭 시 드롭다운 닫기
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent click from closing the dropdown
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
      <IconArea>
        <CircleIcon/>
        <CircleIcon/>
        <CircleIcon/>
      </IconArea>
      <div onClick={() => prevMonth()}>◀</div>
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
          <Dropdown ref={dropdownRef} onClick={handleDropdownClick}>
            <div>
              <SvgIcon onClick={() => handleYearChange('prev')} component={KeyboardArrowLeftIcon} />
              <span>{format(curMonth, 'yyyy')}</span>
              <SvgIcon onClick={() => handleYearChange('next')} component={KeyboardArrowRightIcon} />
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
      <div onClick={() => nextMonth()}>▶</div>
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

const RenderCells = ({ currentMonth, selectedDate, onDateClick, stickers }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';
  let stickerDate = '';

  const getStickerSrcForDate = (day, date) => {
    // disabled(전월 후월 date)는 스티커 적용 제외)
    if (day > monthEnd || day < monthStart)
      return null;

    for (const sticker of stickers) {
      if  (sticker.date === date) {
        return sticker.stickerSrc;
      }
    }
    return null;
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      stickerDate = format(day, 'yyyy-MM-dd');
      const stickerSrc = getStickerSrcForDate(day, stickerDate);
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
          <p
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }
          >
            {formattedDate}
          </p>
          {stickerSrc && (
            <img
              src={stickerSrc}
              alt="sticker"
              style={{
                marginTop: '60%',
                width: '40px',
                height: '40px',
              }}
            />
          )}
        </Cell>
      );
      day = addDays(day, 1);
    }
    rows.push(...days);
    days = [];
  }
  return <CellsContainer>{rows}</CellsContainer>;
};

const Calendar = ({ user, stickers }) => {
  const [curMonth, setCurMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurMonth(subMonths(curMonth, 1));
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

  // const filteredStickers = selected

  return (
    <CalendarContainer>
      <CalendarBox>
        <RenderMonth
          curMonth={curMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          prevYear={() => handleYearSelect(subYears(curMonth, 1))}
          nextYear={() => handleYearSelect(addYears(curMonth, 1))}
          onYearSelect={handleYearSelect}
          onMonthSelect={handleMonthSelect}
        />
        <RenderDays />
        <RenderCells
          currentMonth={curMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          stickers={stickers}
        />
      </CalendarBox>
    </CalendarContainer>
  );
};

export default Calendar;
