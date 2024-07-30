import React, { useState } from "react";
import styled from "styled-components";
import SelectSvg from "../assets/selectedIcon.svg?react";
import DownIcon from "../assets/chevron-down.svg?react";
import UpIcon from "../assets/chevron-up.svg?react";
import VideoIcon from "../assets/Video_duotone_line.svg?react";
import HeadsetIcon from "../assets/Headphones_fill.svg?react";

const Wrapper = styled.div`
  margin-top: 50px;
  border: 1px solid red;
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Ensure proper stacking context */
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

  /* display: flex; */
`;
const NavToggle = styled.div`
  /* border: 1px solid black; */
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;
const ToggleBtn = styled.div`
  width: 50%;
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
`;
const ToggleList = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  position: absolute;
  z-index: 1;
  top: 8%;
  left: 30%;
  width: 40%;
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
const TabSwitcher = styled.div`
  /* border: 1px solid magenta; */
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Switcher = styled.div`
  width: 70%;
  height: 80%;
  border-radius: 3.5rem;
  background: #eee;
  display: flex;
  cursor: default;
`;
const Btn = styled.div`
  background-color: ${(props) => (props.$isActive ? "#262F66" : "none")};
  color: ${(props) => (props.$isActive ? "white" : "#262F66")};
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 3.5rem;
  // typo
  font-family: "Pretendard";
  font-weight: 600;
`;
const LyricsDisplay = styled.div`
  /* border: 1px solid lightblue; */
  height: 77%;
  cursor: default;
`;
const Title = styled.div`
  /* border: 1px solid black; */
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  //typo
  color: #262f66;
  font-family: "Pretendard";
  font-size: 2.0625rem;
  font-style: normal;
  font-weight: 700;
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
  /* border: 1px solid red; */
  height: 7%;
  display: flex;
  justify-content: end;
  align-items: end;
  /* gap: 0.3rem;
  padding: 2rem 1rem; */
  // typo
  color: #6d6d6d;
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
`;
const LinkContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.3rem;
`;

const TotalSongView = () => {
  // 나중에 props로 전달받아야함
  const selectedList = [
    { id: 0, name: "Monsters" },
    { id: 1, name: "이대호" },
    { id: 2, name: "김문호" },
    { id: 3, name: "정성훈" },
  ];
  // toggle 관련
  const [isOn, setIsOn] = useState(false); // 초기 상태 off
  const handleToggle = (isOn) => {
    setIsOn((prevIsOn) => !prevIsOn);
    console.log(isOn);
  };
  const [checkedBtn, setCheckedBtn] = useState(0); // 들어온 선수 id를 null 값 대신에 넣어야함
  const handleToggleBtn = (btnIndex) => {
    handleToggle(isOn);
    setCheckedBtn(btnIndex);
  };
  // 등장곡 & 응원가 관련 -> 선수 props 전달 받아서 창 바뀌어야 함
  const [activeBtn, setActiveBtn] = useState(0);
  const handleBtnClick = (btnIndex) => {
    console.log(btnIndex);
    setActiveBtn(btnIndex);
  };
  return (
    <Wrapper>
      <OuterContainer>
        <BlurredBorder />
        <ContentWrapper>
          <NavToggle>
            <ToggleBtn onClick={() => handleToggle(isOn)}>
              {selectedList[checkedBtn].name}
              {toggle(isOn)}
            </ToggleBtn>
            <ToggleList $isOn={isOn}>
              {selectedList.map((player) => (
                <ToggleItem
                  $isOn={isOn}
                  $isChecked={checkedBtn === player.id}
                  key={player.id}
                  onClick={() => handleToggleBtn(player.id)}
                >
                  {player.name}
                  <SelectIcon $isChecked={checkedBtn === player.id} />
                </ToggleItem>
              ))}
            </ToggleList>
          </NavToggle>
          <TabSwitcher>
            <Switcher>
              <Btn
                $isActive={activeBtn === 0}
                onClick={() => handleBtnClick(0)}
              >
                등장곡
              </Btn>
              <Btn
                $isActive={activeBtn === 1}
                onClick={() => handleBtnClick(1)}
              >
                응원가
              </Btn>
            </Switcher>
          </TabSwitcher>
          <LyricsDisplay>
            <Title>
              <VideoIcon />
              {selectedList[checkedBtn].name}
              {activeBtn === 0 ? " 등장곡" : " 응원가"}
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

export default TotalSongView;
