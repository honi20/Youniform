import React from "react";
import styled from "styled-components";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;

const Label = styled.span`
  font-size: 16px;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 40px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #262F66;
  }

  input:checked + .slider:before {
    transform: translateX(24px);
  }
`;

const Slider = styled.span`
  border-radius: 40px;
`; 

const NotificationToggle = ({ label, enabled = false, onToggle }) => {
  return (
    <ToggleWrapper>
      <Label>{label}</Label>
      <Switch>
        <input
          type="checkbox"
          checked={enabled} // enabled 값이 항상 정의되어 있도록 기본값을 false로 설정
          onChange={onToggle}
        />
        <Slider className="slider round"></Slider>
      </Switch>
    </ToggleWrapper>
  );
};

export default NotificationToggle;
