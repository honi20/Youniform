import React from "react";
import styled from "styled-components";

const FrameContainer = styled.div`
  display: flex;
  height: calc(100% - 40px);
`;

const Wrapper = styled.div`
  padding-left: 3%;
  display: flex;
  flex-flow: row wrap;
  gap: 3.3%;
  margin: 10px;
  overflow-y: auto;
`;

const FrameImgContainer = styled.div`
  flex: 0 0 30%;
  aspect-ratio: 6/4.5;
  overflow: hidden;
  border-radius: 0.625rem;
  border: 1px solid black;
`;

const FrameImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FrameComp = ({ wallpapers, onImageClick }) => {
  return (
    <FrameContainer>
      <Wrapper>
        {wallpapers.map((imageUrl, index) => (
          <FrameImgContainer
            key={index}
            onClickCapture={() => onImageClick(imageUrl)}
          >
            <FrameImg src={imageUrl} alt={`Frame ${index + 1}`} />
          </FrameImgContainer>
        ))}
      </Wrapper>
    </FrameContainer>
  );
};

export default FrameComp;
