import React from "react";
import styled from "styled-components";

const StickerContainer = styled.div`
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
const StickerImgContainer = styled.div`
  flex: 0 0 30%; /* 3열 레이아웃 */
  aspect-ratio: 6/4.5;
  overflow: hidden; /* 비율 유지 */
  /* display: flex; */
  justify-content: center;
  align-items: center;
`;

const StickerImg = styled.img`
  width: 100%;
  height: 90%;

  object-fit: contain;
`;

const StickerComp = ({ stickers, onImageClick }) => {
  // // console.log(stickers);
  return (
    <StickerContainer>
      <Wrapper>
        {stickers.map((sticker, index) => (
          <StickerImgContainer
            key={index}
            onClickCapture={() => onImageClick(sticker)}
          >
            <StickerImg
              src={sticker.imgUrl}
              alt={`Sticker ${index + 1}`}
              // crossOrigin="anonymous"
            />
          </StickerImgContainer>
        ))}
      </Wrapper>
    </StickerContainer>
  );
};

export default StickerComp;
