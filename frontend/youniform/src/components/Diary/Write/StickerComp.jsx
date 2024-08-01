import React from 'react'
import styled from 'styled-components'

const StickerContainer = styled.div`
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

const StickerImgContainer = styled.div`
  flex: 0 0 30%; /* 3열 레이아웃 */
  aspect-ratio: 6/4.5;
  overflow: hidden; /* 비율 유지 */
  display: flex;
  justify-content: center;
  align-items: center;;
`;

const StickerImg = styled.img`
  width: 100%;
  height: 90%;
  
  object-fit: contain;
`;

const StickerComp = ({ stickers, onImageClick }) => {
  return (
    <StickerContainer>
        {stickers.map((stickerUrls, index) => (
            <StickerImgContainer 
                key={index}
                onClickCapture={() => onImageClick(stickerUrls)}>
                <StickerImg src={stickerUrls} alt={`Sticker ${index + 1}`}/>
            </StickerImgContainer>
        ))}
    </StickerContainer>
  )
}

export default StickerComp
