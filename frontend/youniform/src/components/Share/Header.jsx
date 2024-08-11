import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SettingIcon from "@assets/Header/setting.svg?react";
import useUserStore from "@stores/userStore";
import * as Font from "@/typography";
import ColorBtn from "../Common/ColorBtn";
import { clearAccessToken } from "@stores/apiClient";

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
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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

const alarmSvg = (isAlarm, onClick) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3636 5.29755C17.349 4.7863 16.205 4.5 15.0001 4.5C11.1872 4.5 7.984 7.36697 7.56293 11.1566L7.24818 13.9893C7.19559 14.4626 7.17127 14.6798 7.13513 14.8918C7.0032 15.6655 6.75063 16.4138 6.38663 17.1092C6.2869 17.2997 6.17463 17.4872 5.92964 17.8956L5.13872 19.2138L5.11706 19.2498L5.11706 19.2499C4.7326 19.8906 4.41482 20.4202 4.23504 20.8537C4.05051 21.2986 3.95168 21.7811 4.21096 22.239C4.47024 22.697 4.93484 22.8605 5.4113 22.9312C5.87552 23 6.49315 23 7.24037 23H7.28245H22.7177H22.7598C23.507 23 24.1246 23 24.5888 22.9312C25.0653 22.8605 25.5299 22.697 25.7892 22.239C26.0485 21.7811 25.9496 21.2986 25.7651 20.8537C25.5853 20.4202 25.2675 19.8906 24.8831 19.2499L24.8831 19.2498L24.8614 19.2138L24.0705 17.8956C23.8255 17.4872 23.7132 17.2997 23.6135 17.1092C23.2495 16.4138 22.9969 15.6655 22.865 14.8918C22.8289 14.6798 22.8045 14.4626 22.752 13.9893L22.6453 13.0295C22.3312 13.1319 22.0019 13.2006 21.6616 13.2314L21.7581 14.0998L21.7601 14.1177L21.7601 14.1178C21.8102 14.5686 21.8376 14.8158 21.8792 15.0598C22.0288 15.9368 22.315 16.7848 22.7275 17.573C22.8423 17.7923 22.9703 18.0056 23.2037 18.3945L23.213 18.41L24.0039 19.7283C24.4155 20.4142 24.6935 20.8801 24.8414 21.2368C24.9879 21.5901 24.9469 21.697 24.919 21.7463C24.891 21.7957 24.8205 21.8859 24.4421 21.942C24.0601 21.9987 23.5177 22 22.7177 22H7.28245C6.48248 22 5.94001 21.9987 5.55805 21.942C5.17965 21.8859 5.10911 21.7957 5.08116 21.7463C5.05321 21.697 5.0122 21.5901 5.15875 21.2368C5.30667 20.8801 5.58463 20.4142 5.99621 19.7283L6.78714 18.41L6.7964 18.3946C7.02979 18.0056 7.1578 17.7923 7.2726 17.573C7.68513 16.7848 7.97139 15.9368 8.1209 15.0598C8.16251 14.8158 8.18998 14.5685 8.24007 14.1177L8.24206 14.0998L8.55681 11.267C8.92161 7.98383 11.6967 5.5 15.0001 5.5C15.9373 5.5 16.832 5.69994 17.6412 6.06135C17.8516 5.77945 18.0942 5.52302 18.3636 5.29755ZM20.1156 6.52162C19.8108 6.67707 19.5422 6.8932 19.3256 7.15407C20.4712 8.18024 21.2533 9.61221 21.4406 11.2428C21.7897 11.2165 22.1188 11.1185 22.4132 10.9635C22.1725 9.20824 21.3328 7.66156 20.1156 6.52162Z"
        fill="#848484"
      />
      <path
        d="M11.3778 23.0073C11.5914 23.9376 12.0622 24.7596 12.7171 25.3459C13.3721 25.9322 14.1745 26.25 15 26.25C15.8255 26.25 16.6279 25.9322 17.2829 25.3459C17.9378 24.7596 18.4086 23.9376 18.6222 23.0073"
        stroke="#848484"
        strokeLinecap="round"
      />
      <circle
        cx="21.25"
        cy="8.75"
        r="2.5"
        fill={isAlarm ? "#ff1744" : "#848484"}
      />
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
`;

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState(localStorage.getItem("accessToken"));
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isAlarm, setIsAlarm] = useState(null); // 알람 유무에 따라 색 변경

  const handleBack = () => {
    navigate(-1);
  };

  const handleBackPhotocard = () => {
    navigate(`/photo-card/binder`);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    clearAccessToken();
    setIsToken(null);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsToken(accessToken);
  }, [setIsToken]);

  const renderContent = () => {
    switch (true) {
      case currentPath.startsWith("/photo-card/detail/"):
        return (
          <InnerHead>
            <div onClick={handleBackPhotocard}>{backSvg(theme)}</div>
          </InnerHead>
        );
      case currentPath === "/photo-card/binder":
      return (
        <InnerHead>
        </InnerHead>
      );
      case ["/", "/photo-card", "/diary", "/post"].includes(currentPath):
        return (
          <InnerHead>
            <Logo>
              <SportsBaseballIcon />
              <strong>Youniform</strong>
            </Logo>
            {/* <ColorBtn onClick={checkToken}>테스트</ColorBtn> */}
            {isToken ? (
              <ColorBtn onClick={handleLogoutClick}>LOGOUT</ColorBtn>
            ) : (
              <ColorBtn onClick={handleLoginClick}>LOGIN</ColorBtn>
            )}
          </InnerHead>
        );
      case currentPath === "/my-page":
        return (
          <InnerHead>
            <IconContainer>
              {alarmSvg(isAlarm, () => navigate("/alert"))}
              <SettingIcon onClick={() => navigate("/setting")} />
            </IconContainer>
          </InnerHead>
        );
      case currentPath === "/setting":
        return (
          <InnerHead>
            <div onClick={handleBack}>{backSvg(theme)}</div>
            <div style={{ position: "absolute", right: "50%" }}>설정</div>
          </InnerHead>
        );
      case currentPath === "/alert":
        return (
          <InnerHead>
            <div onClick={handleBack}>{backSvg(theme)}</div>
            <div style={{ position: "absolute", right: "45%" }}>알림함</div>
          </InnerHead>
        );
      default:
        return (
          <InnerHead>
            <div onClick={handleBack}>{backSvg(theme)}</div>
          </InnerHead>
        );
    }
  };

  return <Head>{renderContent()}</Head>;
};

export default Header;
