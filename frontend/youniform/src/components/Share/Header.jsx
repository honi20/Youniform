import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SettingIcon from '@assets/Header/setting.svg?react';
import AlarmIcon from '@assets/Header/alarm.svg?react';
const Head = styled.div`
  background-color: #f8f8f8;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  // border: 1px solid orange;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  z-index: 10;
`;

const InnerHead = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 92%;
  margin: 0 auto;
  gap: 5px;
  border: 1px solid red;
`;

const backSvg = (theme) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Expand_left_light">
        <path id="Vector 9" d="M15 6L9 12L15 18" stroke={theme.primary} />
      </g>
    </svg>
  );
};

const IconContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  border: 1px solid blue;
  align-items: center;
  gap: 5px;
`
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const theme = useTheme();
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const renderContent = () => {
    switch (currentPath) {
      case "/":
      case "/photo-card":
      case "/diary":
      case "/community":
        return (
          <InnerHead>
            <SportsBaseballIcon />
            <strong>Youniform</strong>
          </InnerHead>
        );
      case "/my-page":
        return (
          <InnerHead>
            <SportsBaseballIcon />
            <strong>Youniform</strong>
            <IconContainer>
              <AlarmIcon />
              <SettingIcon onClick={() => navigate('/setting')}/>
            </IconContainer>
          </InnerHead>
        );
      default:
        return (
          <InnerHead>
          <div onClick={handleBack}>
            {backSvg(theme)}
          </div>
          </InnerHead>
        );
    }
  };

  return <Head>{renderContent()}</Head>;
};

export default Header;
