import React, { useEffect } from "react";
import styled from "styled-components";
import * as Font from "@/typography";

const Container = styled.div`
  padding: 0 5%;
  height: calc(100vh - 120px);
  /* border: 1px solid black; */
`;
const SettingComp = styled.div`
  ${Font.Small}
  height: 7%;
  padding: 3%;
  display: flex;
  align-items: center;
  gap: 3%;
  /* border: 1px solid rebeccapurple; */
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1;
`;
import LogoutIcon from "@assets/Setting/logout.svg?react";
import PrivacyIcon from "@assets/Setting/privacy.svg?react";
import StarIcon from "@assets/Setting/star.svg?react";
import BellIcon from "@assets/Setting/bell.svg?react";
import ChieldIcon from "@assets/Setting/chield.svg?react";
import MessageIcon from "@assets/Setting/message.svg?react";
import InfoIcon from "@assets/Setting/info.svg?react";
import SearchIcon from "@assets/Setting/search.svg?react";
import FolderIcon from "@assets/Setting/folder.svg?react";
import ResignIcon from "@assets/Setting/resign.svg?react";
import { useNavigate, Outlet } from "react-router-dom";

const settings = [
  { icon: <LogoutIcon />, text: "로그아웃", navigate: "/" },
  {
    icon: <PrivacyIcon />,
    text: "비밀번호 변경",
    navigate: "change-password",
  },
  { icon: <StarIcon />, text: "테마 설정", navigate: "theme" },
  { icon: <BellIcon />, text: "푸시 알림", navigate: "notifications" },
  { icon: <ResignIcon />, text: "탈퇴하기", navigate: "delete-account" },
];

const SettingItem = ({ icon, text, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <SettingComp onClick={() => navigate(navigateTo)}>
      <IconWrapper>{icon}</IconWrapper>
      {text}
    </SettingComp>
  );
};

const SettingView = () => {
  return (
    <Container>
      {settings.map((setting, index) => (
        <SettingItem
          key={index}
          icon={setting.icon}
          text={setting.text}
          navigateTo={setting.navigate}
        />
      ))}
      <Outlet />
    </Container>
  );
};

export default SettingView;
