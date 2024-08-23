import React from "react";
import styled from "styled-components";
import useResourceStore from "../../../stores/resoureStore";
const Div = styled.div`
  box-sizing: border-box;
  /* height: 40px; */
  width: 100%;
  padding: 7px;
  display: flex;
  justify-content: center;
  align-items: end;
  /* border: 1px solid black; */
`;
const Container = styled.div`
  width: 70%;
  height: 28px;
  margin: 0 3px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$isClicked ? props.theme.secondary : "white"};
`;
const categories = [
  { index: 0, name: "BASEBALL" },
  { index: 1, name: "CUTE" },
  { index: 2, name: "LETTER" },
  { index: 3, name: "RETRO" },
];
const CategoryComp = () => {
  const { setSelectedCategory, selectedCategory } = useResourceStore(
    (state) => ({
      setSelectedCategory: state.setSelectedCategory,
      selectedCategory: state.selectedCategory
    })
  );
  // // console.log(selectedCategory);
  return (
    <Div>
      {categories.map((elem, index) => {
        return (
          <Container
            key={index}
            onClick={() => setSelectedCategory(elem.name)}
            $isClicked={elem.name == selectedCategory}
          >
            {elem.name}
          </Container>
        );
      })}
    </Div>
  );
};

export default CategoryComp;
