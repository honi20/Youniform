import React from "react";
import styled from "styled-components";
import ExpandDownIcon from "@assets/Expand_down.svg?react";

const SaveBtn = styled.div`
  position: absolute;
  z-index: 11;
  width: 3rem;
  height: 3rem;
  right: 4%;
  top: 1px;
  margin-top: 1px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const BtnContainer = styled.div`
  display: ${(props) => (props.$decorated ? "none" : "flex")};
  justify-content: space-between;
  height: 4rem;
  /* border: 1px solid blue; */
`;
const Btn = styled.div`
  display: ${(props) => (props.$decorated ? "none" : "flex")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  /* border: 1px solid lightblue; */
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #acc0e2;
  cursor: pointer;
  box-sizing: border-box;
  /* border: 2px solid #000; */
`;
const DecorationContainer = styled.div`
  width: 90%;
  height: 30%;
  box-sizing: border-box;
  border: 5px solid blue;
`;
const DecorationPanel = styled.div`
  display: ${(props) => (props.$decorated ? "block" : "none")};
  width: 100%;
  display: flex;
  border: 3px solid black;
`;
const StyledExpandDownIcon = styled(ExpandDownIcon)`
  width: 1rem;
  height: 1rem;
  fill: black;
`;
const DecorationBtnContainer = styled.div`
  display: ${(props) => (props.$decorated ? "flex" : "none")};
  width: 100%;
  justify-content: space-between;
  /* border: 1px solid red; */
`;
const DecorationBtn = styled.button`
  width: 18%;
  height: 2.5rem;
  flex-shrink: 0;
  box-sizing: border-box;

  // style
  border-radius: 0.625rem 0.625rem 0rem 0rem;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  border-left: 2px solid #000;
  border-bottom: ${(props) => (props.$selected ? "none" : "2px solid #000")};
  background: ${(props) => (props.$selected ? "#ECF3F8" : "#ACC0E2")};

  // typo
  color: #000;
  font-family: "DungGeunMo";
  font-size: clamp(0.5rem, 2vh + 0.1rem, 1rem);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.0625rem;
  position: relative;
  z-index: 2;
`;
const DecorationMenu = styled.div`
  width: 100%;
  height: 90%;
  flex-shrink: 0;
  box-sizing: border-box;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 2px solid #000;
  /* background: #ECF3F8; */
  position: relative;
  top: -3px; /* 테두리 제거와 위치 맞추기 위한 조정 */
  display: ${(props) =>
    props.$decorated ? "block" : "none"}; /* visibility 토글 */
`;
const InitializationBtn = styled.button`
  // layout
  width: 10rem;
  height: 2.5rem;
  position: relative;
  flex-shrink: 0;
  display: ${(props) => (props.$decorated ? "none" : "block")};
  left: 50%;
  top: 50%;
  transform: translateX(-50%);

  // style
  border-radius: 0.625rem;
  /* border: 1.5px solid black; */
  background: #e3e3e3;

  // typo
  color: #000;
  font-family: "DungGeunMo";
  font-size: clamp(0.5rem, 2vh + 0.1rem, 1rem);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.0625rem;
`;

const IconFont = styled.div`
  color: #acc0e2;
  font-family: "DungGeunMo";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01031rem;
  /* margin-top: 0.5rem; */
`;
export {
  IconFont,
  CloseBtn,
  BtnContainer,
  InitializationBtn,
  DecorationContainer,
  DecorationPanel,
  DecorationBtn,
  DecorationMenu,
  StyledExpandDownIcon,
  DecorationBtnContainer,
  Btn,
  SaveBtn,
};
