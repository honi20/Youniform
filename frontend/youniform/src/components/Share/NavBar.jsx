import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Icon, SvgIcon } from "@mui/material";
import { format } from 'date-fns';
import { styled as muiStyled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import CommunityIcon from "../../assets/NavBar/community.svg?react";
import DiaryIcon from "../../assets/NavBar/diary.svg?react";
import HomeIcon from "../../assets/NavBar/home.svg?react";
import MyPageIcon from "../../assets/NavBar/my_page.svg?react";
import PhotoCardIcon2 from "../../assets/NavBar/photo_card2.svg?react";

const Nav = styled.nav`
  background: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding: 0% 2%;
`;

const LinkDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #848484;
  font-size: 10px;
  text-decoration: none;
  color: inherit;

  svg {
    margin-bottom: 4px;
  }
`;

const CustomBtn = muiStyled(IconButton)(() => ({
  color: "#FF506F",
}));

const NavBar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);
  
  const formatDate = (day) => format(day, 'yyyy-MM-dd');
  const formattedDate = formatDate(new Date());
  
  return (
    <Nav>
      <LinkDiv>
        <StyledLink to="/">
          <HomeIcon />
          <p>홈</p>
        </StyledLink>
      </LinkDiv>
      <LinkDiv>
        <StyledLink to="/photo-card">
          <PhotoCardIcon2 />
          <p>포토카드</p>
        </StyledLink>
      </LinkDiv>
      <LinkDiv>
        {currentPath === "/diary" ? (
          <StyledLink to={`/diary/write/${formattedDate}`}>
            <CustomBtn>
              <AddCircleIcon />
            </CustomBtn>
          </StyledLink>
        ) : (
          <StyledLink to="/diary">
            <DiaryIcon />
            <p>다이어리</p>
          </StyledLink>
        )}
      </LinkDiv>
      <LinkDiv>
        <StyledLink to="/post">
          <CommunityIcon />
          <p>포스트</p>
        </StyledLink>
      </LinkDiv>
      <LinkDiv>
        <StyledLink to="/my-page">
          <MyPageIcon />
          <p>마이페이지</p>
        </StyledLink>
      </LinkDiv>
    </Nav>
  );
};

export default NavBar;
