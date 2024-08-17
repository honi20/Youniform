import styled, { useTheme } from "styled-components";
import * as Font from "@/typography";
import SelectSvg from "@assets/Main/selectedIcon.svg?react";
import DownIcon from "@assets/Main/chevron-down.svg?react";
import UpIcon from "@assets/Main/chevron-up.svg?react";
export const Wrapper = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const OuterContainer = styled.div`
  position: relative;
  width: 95%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BlurredBorder = styled.div`
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

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 1.5rem;
  width: 95%;
  height: 95%;

  /* display: flex; */
`;
export const NavToggle = styled.div`
  /* border: 1px solid black; */
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;
export const ToggleBtn = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  // typo
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
`;
export const ToggleList = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  position: absolute;
  z-index: 1;
  top: 8%;
  left: 25%;
  width: 50%;
  border: 1px solid #737373;
  background-color: white;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: auto;
  border-radius: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0.5rem;
`;
export const ToggleItem = styled.div`
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
export const toggle = (isOn) => {
  return (
    <div style={{ display: "flex" }}>{isOn ? <UpIcon /> : <DownIcon />}</div>
  );
};
export const SelectIcon = styled(SelectSvg)`
  display: ${(props) => (props.$isChecked ? "block" : "none")};
`;
export const TabSwitcher = styled.div`
  /* border: 1px solid magenta; */
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Switcher = styled.div`
  width: 70%;
  height: 80%;
  border-radius: 3.5rem;
  background: #eee;
  display: flex;
  cursor: default;
`;
export const Btn = styled.div`
  background-color: ${(props) => (props.$isActive ? "#262F66" : "none")};
  color: ${(props) => (props.$isActive ? "white" : "#262F66")};
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 3.5rem;
  // typo
  font-weight: 600;
`;
export const Content = styled.div`
  /* border: 1px solid black; */
  
`
export * from "./SongStyle";