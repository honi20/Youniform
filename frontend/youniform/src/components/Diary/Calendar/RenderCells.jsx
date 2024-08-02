import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';

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
    color: #FF4D6C;
  }

  &.not-valid {
    color: #ddd;
  }
`;

const RenderCells = ({ currentMonth, selectedDate, onDateClick, stamps }) => {
  const navigate = useNavigate();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';
  let stampDate = '';

  const getStampSrcForDate = (day, date) => {
    if (day > monthEnd || day < monthStart) return null;

    for (const stamp of stamps) {
      if (stamp.date === date) {
        return stamp.stampSrc;
      }
    }
    return null;
  };

  const handleDateClick = (day, stampSrc) => {
    const cloneDay = new Date(day);
    if (!stampSrc) {
      navigate('/write-diary');
    } else {
      onDateClick(cloneDay);
    }
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      stampDate = format(day, 'yyyy-MM-dd');
      const stampSrc = getStampSrcForDate(day, stampDate);
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
          onClick={() => handleDateClick(cloneDay, stampSrc)}
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
          {stampSrc && (
            <img
              src={stampSrc}
              alt="stamp"
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

export default RenderCells;