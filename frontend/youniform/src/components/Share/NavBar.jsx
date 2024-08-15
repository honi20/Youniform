import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { format } from "date-fns";
import { styled as muiStyled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import CommunityIcon from "@assets/NavBar/community.svg?react";
import DiaryIcon from "@assets/NavBar/diary.svg?react";
import HomeIcon from "@assets/NavBar/home.svg?react";
import MyPageIcon from "@assets/NavBar/my_page.svg?react";
import PhotoCardIcon2 from "@assets/NavBar/photo_card2.svg?react";
import useDiaryStore from "../../stores/diaryStore";

const Nav = styled.nav`
  background: #ffffff;
  position: fixed;
  bottom: 0;
  z-index: 10;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0% 2%;
  /* border: 1px solid black; */
  width: 100%;
  max-width: 400px;
  @media (min-width: 400px) {
    .nav {
      max-width: 400px !important;
      width: 100% !important;
      margin: 0 auto !important;
    }
  }
`;

const LinkDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid pink; */
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

const CustomBtn = muiStyled(IconButton)(({ theme }) => ({
  color: theme.primary,
}));

const NavBar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const theme = useTheme();
  const {monthlyDiaries, fetchMonthlyDiaries} = useDiaryStore()
  const [writed, setWrited] = useState(false)

  const formatDate = (day) => format(day, "yyyy-MM-dd");
  const formattedDate = formatDate(new Date());
  useEffect(() => {
    // console.log('juyeon navbar test')
    setCurrentPath(location.pathname);
    if (!monthlyDiaries || monthlyDiaries.length == 0){
      fetchMonthlyDiaries();
    }
    
    setWrited(monthlyDiaries.some((diary) => diary.diaryDate == formattedDate))
  }, [location.pathname, fetchMonthlyDiaries, monthlyDiaries]);
  

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
        {currentPath === "/diary" && !writed ? (
          <StyledLink to={`/diary/write/${formattedDate}`}>
            <CustomBtn theme={theme}>
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
