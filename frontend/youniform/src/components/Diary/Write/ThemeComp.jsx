import React from 'react'
import styled from "styled-components";

const ThemeContainer = styled.div`
  display: flex;
  /* height: calc(100% - 40px); */
  height: 100%;
  /* border: 1px solid red; */
`;
const Wrapper = styled.div`
  padding-left: 3%;
  display: flex;
  flex-flow: row wrap;
  gap: 3.3%;
  margin: 10px;
  overflow-y: auto;
`;
const ThemeImgContainer = styled.div`
  flex: 0 0 30%;
  aspect-ratio: 6/4.5;
  overflow: hidden;
  border-radius: 0.625rem;
  border: 1px solid black;
`;

const ThemeImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ThemeComp = ({ themes, onImageClick }) => {
  return (
    <ThemeContainer>
      <Wrapper>
        {themes &&
          themes.map((theme, index) => (
            <ThemeImgContainer
              key={index}
              onClickCapture={() => onImageClick(theme)}
            >
              <ThemeImg
                src={theme.imgUrl}
                alt={`theme ${index + 1}`}
                // crossOrigin="anonymous"
              />
            </ThemeImgContainer>
          ))}
      </Wrapper>
    </ThemeContainer>
  )
}

export default ThemeComp