import React, { useState } from 'react'
import styled from 'styled-components'
import { format, addMonths, subMonths } from 'date-fns'

const SelectBox = styled.div`
  display: flex;
`

const RenderMonth = ({ curMonth, prevMonth, nextMonth }) => {
  return (
    <div className='month-row'>
      <div>
        {/* 왼쪽 동그라미 아이콘 세개 */}
      </div>
      <SelectBox>
        <div>
          {/* 왼쪽 아이콘 */}
          ◀
        </div>
        <span className="text">
          <span className='text year'>
            {format(curMonth, 'yyyy')}년
          </span>
          <span className="text month">
            {format(curMonth, 'M')}월
          </span>
        </span>
        <div>
          {/* 오른쪽 아이콘 */}
          ▶
        </div>
      </SelectBox>
    </div>
  )
}

const Calendar = () => {
  const [curMonth, setCurMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurMonth(subMonths(curMonth, 1));
  };
  const nextMonth = () => {
    setCurMonth(addMonths(curMonth, 1));
  }

  return (
    <div className='calendar'>
      <RenderMonth
        curMonth={curMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <div>
        {/* Days 렌더링 */}
      </div>
      <div>
        {/* Cells 렌더링 */}
      </div>
    </div>
  )
}

export default Calendar
