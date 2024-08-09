import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import VideoIcon from "@assets/Video_duotone_line.svg?react";
import HeadsetIcon from "@assets/Headphones_fill.svg?react";
import DownIcon from "@assets/chevron-down.svg?react";
import UpIcon from "@assets/chevron-up.svg?react";
import SelectSvg from "@assets/selectedIcon.svg?react";
const Wrapper = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const OuterContainer = styled.div`
  position: relative;
  width: 95%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlurredBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1.5rem;
  border: 1px solid #262f66;
  filter: blur(2px);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 1.5rem;
  width: 95%;
  height: 95%;
`;
const NavToggle = styled.div`
  height: 8%;
  display: flex;
  align-items: center;
  cursor: default;
  /* border: 1px solid black; */
`;
const backBtnSvg = () => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M4.6665 14L3.9594 13.2929L3.25229 14L3.9594 14.7071L4.6665 14ZM22.1665 15C22.7188 15 23.1665 14.5523 23.1665 14C23.1665 13.4477 22.7188 13 22.1665 13V15ZM10.9594 6.29289L3.9594 13.2929L5.37361 14.7071L12.3736 7.70711L10.9594 6.29289ZM3.9594 14.7071L10.9594 21.7071L12.3736 20.2929L5.37361 13.2929L3.9594 14.7071ZM4.6665 15H22.1665V13H4.6665V15Z"
        fill={theme.primary}
      />
    </svg>
  );
};
const BackButton = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid blue; */
`;
const ToggleBtn = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  // typo
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  cursor: default;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  /* box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.04); */
  /* border: 1px solid red; */
`;

const ToggleList = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  position: absolute;
  z-index: 1;
  top: 8%;
  left: 15%;
  width: 70%;
  border: 1px solid #737373;
  background-color: white;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: auto;
  border-radius: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0.5rem;
`;
const ToggleItem = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  padding: 0.63rem 1rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: ${(props) => (props.$isChecked ? "1px solid #262F66" : "")};
  background-color: ${(props) =>
    props.$isChecked ? "rgba(38, 47, 102, 0.30)" : "white"};
  // typo
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration-line: underline;
    cursor: pointer;
  }
`;
const toggle = (isOn) => {
  return (
    <div style={{ display: "flex" }}>{isOn ? <UpIcon /> : <DownIcon />}</div>
  );
};
const SelectIcon = styled(SelectSvg)`
  display: ${(props) => (props.$isChecked ? "block" : "none")};
`;
const LyricsDisplay = styled.div`
  height: 77%;
  cursor: default;
  /* border: 1px solid lightblue; */
`;
const Title = styled.div`
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  //typo
  color: #262f66;
  font-family: "Pretendard";
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 700;
  /* border: 1px solid black; */
`;
const Character = styled.div`
  border: 1px solid blue;
  height: 40%;
`;
const Lyrics = styled.div`
  border: 1px solid red;
  height: 45%;
`;
const Footer = styled.div`
  height: 7%;
  display: flex;
  justify-content: end;
  align-items: end;
  // typo
  color: #6d6d6d;
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.3rem;
  /* border: 1px solid blue; */
`;

const TeamSongView = ({ songs, active }) => {
  // toggle 관련
  const [isOn, setIsOn] = useState(false); // 초기 상태 off
  const handleToggle = (isOn) => {
    setIsOn((prevIsOn) => !prevIsOn);
    console.log(isOn);
  };
  const [selected, setSelected] = useState(0); // 들어온 선수 id를 null 값 대신에 넣어야함
  const handleToggleBtn = (btnIndex) => {
    handleToggle(isOn);
    console.log(btnIndex);
    setSelected(btnIndex);
  };
  return (
    <Wrapper>
      <OuterContainer>
        <BlurredBorder />
        <ContentWrapper>
          <NavToggle>
            <BackButton onClick={() => window.history.back()}>
              {backBtnSvg()}
            </BackButton>
            <ToggleBtn onClick={() => handleToggle(isOn)}>
              {teamSongs[selected].title}
              {toggle(isOn)}
            </ToggleBtn>
            <ToggleList $isOn={isOn}>
              {songs.map((song) => (
                <ToggleItem
                  $isOn={isOn}
                  $isChecked={selected === song.id}
                  key={song.id}
                  onClick={() => handleToggleBtn(song.id)}
                >
                  {song.title}
                  <SelectIcon $isChecked={selected === song.id} />
                </ToggleItem>
              ))}
            </ToggleList>
          </NavToggle>
          <LyricsDisplay>
            <Title>
              <VideoIcon />
              {teamSongs[selected].title}
            </Title>
            <Character>캐릭터</Character>
            <Lyrics>가사</Lyrics>
          </LyricsDisplay>
          <Footer>
            <LinkContainer onClick={() => console.log("유튜브링크")}>
              <HeadsetIcon />
              노래 듣기
            </LinkContainer>
          </Footer>
        </ContentWrapper>
      </OuterContainer>
    </Wrapper>
  );
};

export default TeamSongView;
