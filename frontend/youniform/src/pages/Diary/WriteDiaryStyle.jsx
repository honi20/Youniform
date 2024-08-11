import styled from "styled-components";

export const Div = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: ${(props) => (props.$decorated ? "99" : "")};
  background-color: ${(props) =>
    props.$decorated ? "rgb(146, 146, 146)" : ""};
  top: 0;
  height: ${(props) => (props.$decorated ? "100vh" : "calc(100vh - 120px);")};
  position: ${(props) => (props.$decorated ? "absolute" : "")};
  /* border: 5px solid black; */
`;

export const IconContainer = styled.div`
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SaveBtn = styled.div`
  position: absolute;
  z-index: 10;
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
export const BtnContainer = styled.div`
  display: ${(props) => (props.$decorated ? "none" : "flex")};
  justify-content: space-between;
  height: 4rem;
  /* border: 1px solid blue; */
`;
export const Btn = styled.div`
  display: ${(props) => (props.$decorated ? "none" : "flex")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  /* border: 1px solid lightblue; */
`;

export const DecorationContainer = styled.div`
  width: 90%;
  height: ${(props) => (props.$decorated ? "calc(100vh - 530px)" : "70px")};
  top: ${(props) => (props.$decorated ? "520px" : "570px")};
  bottom: ${(props) => (props.$decorated ? "calc(50vh - 330px)" : "")};
  box-sizing: border-box;
  position: absolute;
  z-index: ${(props) => (props.$decorated ? "100" : "")};
  /* border: 5px solid blue; */
`;
export const DecorationPanel = styled.div`
  display: ${(props) => (props.$decorated ? "block" : "none")};
  width: 100%;
  display: flex;
  /* border: 3px solid black; */
`;

export const DecorationBtnContainer = styled.div`
  display: ${(props) => (props.$decorated ? "flex" : "none")};
  width: 100%;
  justify-content: space-between;
  /* border: 1px solid red; */
`;
export const DecorationBtn = styled.button`
  width: 18%;
  height: 35px;
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
  font-size: clamp(0.5rem, 2vh + 0.01rem, 1rem);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.0625rem;
  position: relative;
  z-index: 2;
`;
export const DecorationMenu = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  flex-shrink: 0;
  box-sizing: border-box;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 2px solid black;
  background: #ecf3f8;
  position: relative;
  top: -2px;
  display: ${(props) => (props.$decorated ? "block" : "none")};
`;
export const CloseBtn = styled.div`
  display: ${(props) => (props.$decorated ? "flex" : "none")};
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 50%;
  left: 25%;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 2px solid black;
  background: #acc0e2;
  cursor: pointer;
  box-sizing: border-box;

  font-family: "DungGeunMo";
  font-size: clamp(0.5rem, 2vh + 0.1rem, 1rem);
  font-style: normal;
  font-weight: 400;
`;
export const InitializationBtn = styled.button`
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

export const IconFont = styled.div`
  color: #acc0e2;
  font-family: "DungGeunMo";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01031rem;
`;
export const StampContainer = styled.div`
  position: absolute;
  z-index: 10;
  width: auto;
  height: 50px;
  right: calc(50vw - 75px);
  top: 1px;
  margin-top: 1px;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  align-items: center;
`;
export * from "./WriteDiaryStyle";
