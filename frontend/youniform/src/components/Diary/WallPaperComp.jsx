import React from 'react';
import styled from 'styled-components';

const WallpaperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px; /* 이미지 간의 간격 */
  padding: 16px;
`;

const WallpaperImgContainer = styled.div`
  flex: 0 0 30%; /* 3열 레이아웃 */
  aspect-ratio: 5 / 8;
  background: #f0f0f0; /* 이미지가 로드되지 않을 경우 배경색 */
  overflow: hidden; /* 비율 유지 */
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
