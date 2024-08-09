import React from "react";
import styled from "styled-components";

const Div = styled.div`
  box-sizing: border-box;
  height: 40px;
  width: 100%;

  /* background-color: purple; */
  /* border: 1px solid purple; */
  display: flex;
  justify-content: center;
  align-items: end;
`;
const Colorchip = styled.div`
  width: 28px;
  height: 28px;
  margin: 0 4px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: ${(props) => (props.$color ? props.$color : "black")};
`;
const colors = [
  { index: 0, color: "#FFFFFF" },
  { index: 1, color: "#EBEBEB" },
  { index: 2, color: "#FFDCDC" },
  { index: 3, color: "#FFD3B2" },
  { index: 4, color: "#FFF7C0" },
  { index: 5, color: "#C8FFC4" },
  { index: 6, color: "#C1E3FF" },
  { index: 7, color: "#E8C9FF" },
  { index: 8, color: "#000000" },
];
const ColorChipComp = () => {
  return (
    <Div>
      {colors.map((elem, index) => {
        return <Colorchip key={index} $color={elem.color} />;
      })}
    </Div>
  );
};

export default ColorChipComp;
