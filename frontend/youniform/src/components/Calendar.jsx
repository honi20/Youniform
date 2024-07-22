import React, { useState } from 'react'
import styled from 'styled-components'
import { format, addMonths, subMonths } from 'date-fns'

const CalendarBox = styled.div`
  width: 90%;
  height: 500px;
  border: 1px solid blue;
  margin: 0 auto;
  margin-top: 50px;
`
const MonthRow = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  border: 1px solid red;
  justify-content: space-between;
  align-items: center;
`

const SelectBox = styled.div`
  display: flex;
`


const RenderMonth = ({ curMonth, prevMonth, nextMonth }) => {
  return (
    <MonthRow>
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
    </MonthRow>
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <CalendarBox>
        <RenderMonth
          curMonth={curMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <div>
          {/* Days 렌더링 */}
          <h3>Days Section</h3>
        </div>
        <div>
          {/* Cells 렌더링 */}
          <h3 >Cells Section</h3>
        </div>
      </CalendarBox>

    </LocalizationProvider>
  )
}

export default Calendar
