import React from "react";
import styled from "styled-components";
import { wallpapers } from "@assets";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageItem = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
`;

const WallPaperComp = ({ handleImageClick }) => {
  return (
    <Container>
      <h3>배경 이미지 선택</h3>
      <ImageList>
        {wallpapers.map((wallpaper, index) => (
          <ImageItem
            key={index}
            src={wallpaper}
            alt={`Wallpaper ${index + 1}`}
            onClick={() => handleImageClick(wallpaper)}
          />
        ))}
      </ImageList>
    </Container>
  );
};

export default WallPaperComp;
