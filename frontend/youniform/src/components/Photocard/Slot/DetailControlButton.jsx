import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const Label = styled.div`
  font-size: 12px;
  color: black;
`;

const DetailControlButton = ({ icon: Icon, label }) => {
  return (
    <Circle>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Label>{label}</Label>
    </Circle>
  );
}

export default DetailControlButton;
