import React from 'react';
import styled from 'styled-components';

const WallpaperContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px; /* 이미지 간의 간격 */
  padding: 16px;
  overflow-y: auto;
  max-height: 100%;
  margin-bottom: 5px;
`;

const WallpaperImgContainer = styled.div`
  flex: 0 0 30%; /* 3열 레이아웃 */
  aspect-ratio: 6/4.5;
  background: #f0f0f0; 
  overflow: hidden; 
  border-radius: 0.625rem;
  border: 1px solid #000;
`;

const WallpaperImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WallPaperComp = ({ wallpapers, onImageClick }) => {
  return (
    <WallpaperContainer>
      {wallpapers.map((imageUrl, index) => (
        <WallpaperImgContainer key={index}
            onClickCapture={() => onImageClick(imageUrl)}>
            <WallpaperImg src={imageUrl} alt={`Wallpaper ${index + 1}`} />
        </WallpaperImgContainer>
      ))}
    </WallpaperContainer>
  );
}

export default WallPaperComp;