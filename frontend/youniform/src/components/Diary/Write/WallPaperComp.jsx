import React from "react";
import styled from "styled-components";

const WallpaperContainer = styled.div`
  display: flex;
  height: calc(100% - 40px);
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
const WallpaperImgContainer = styled.div`
  flex: 0 0 30%;
  aspect-ratio: 6/4.5;
  overflow: hidden;
  border-radius: 0.625rem;
  border: 1px solid black;
`;

const WallpaperImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WallPaperComp = ({ backgrounds, onImageClick }) => {
  return (
    <WallpaperContainer>
      <Wrapper>
        {backgrounds &&
          backgrounds.map((background, index) => (
            <WallpaperImgContainer
              key={index}
              onClickCapture={() => onImageClick(background)}
            >
              <WallpaperImg
                src={background.imgUrl}
                alt={`background ${index + 1}`}
                // crossOrigin="anonymous"
              />
            </WallpaperImgContainer>
          ))}
      </Wrapper>
    </WallpaperContainer>
  );
};

export default WallPaperComp;
