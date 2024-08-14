import React from "react";
import styled from "styled-components";
import useResourceStore from "@stores/resoureStore";
const Div = styled.div`
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
`;
const Colorchip = styled.div`
  width: 28px;
  height: 28px;
  margin: 0 4px;
  border: 1px solid;
  border-radius: 10px;
  background-color: ${(props) => (props.$color ? props.$color : "black")};
  border-color: ${(props) =>
    props.$isClicked ? props.theme.primary : "white"};
`;

const colors = [
  { index: 0, name: "WHITE", color: "#FFFFFF" },
  { index: 1, name: "GRAY", color: "#EBEBEB" },
  { index: 2, name: "RED", color: "#FFDCDC" },
  { index: 3, name: "ORANGE", color: "#FFD3B2" },
  { index: 4, name: "YELLOW", color: "#FFF7C0" },
  { index: 5, name: "GREEN", color: "#C8FFC4" },
  { index: 6, name: "BLUE", color: "#C1E3FF" },
  { index: 7, name: "PURPLE", color: "#E8C9FF" },
  { index: 8, name: "BLACK", color: "#000000" },
];
const ColorChipComp = () => {
  const { setSelectedColor, selectedColor } = useResourceStore((state) => ({
    setSelectedColor: state.setSelectedColor,
    selectedColor: state.selectedColor,
  }));
  return (
    <Div>
      {/* {selectedColor} */}
      {colors.map((elem, index) => {
        return (
          <Colorchip
            key={index}
            $color={elem.color}
            onClick={() => setSelectedColor(elem.name)}
            $isClicked={elem.name == selectedColor}
          />
        );
      })}
    </Div>
  );
};

export default ColorChipComp;
