import React from 'react';
import styled from 'styled-components';

const DaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 30px;
  margin: 0 auto;
  justify-content: space-between;
  border-top: 2px solid #787878;
  border-bottom: 2px solid #787878;
  align-items: center;
`;

const DayColumn = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 800;
  color: #787878;
`;

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

export default RenderDays;