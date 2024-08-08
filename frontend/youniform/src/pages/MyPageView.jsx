import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "@components/MyPage/Profile";
import styled from "styled-components";

const Div = styled.div`
  height: calc(100vh - 120px);
  /* border: 1px solid black; */
`;

const MyPageView = () => {
  return (
    <>
      <Div>
        <Profile />
      </Div>
      <Outlet />
    </>
  );
};

export default MyPageView;
