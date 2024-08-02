import React from 'react';
import styled from 'styled-components';

const BinderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 88vh;
  background-color: #f5f5f5;
`;

const Paper = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  height: 80%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Holes = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25% 0;
`;

const Hole = styled.div`
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border-radius: 50%;
  transform: translateX(-50%);
`;

const PhotoSlot = styled.div`
  display: flex;
  width: 100%;
  margin-left: auto;
  width: calc(100% - 30px);
  height: 100%;
`;

const PhotoGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  width: 90%;
  height: 80%;
  margin-top: 2rem;
  margin-left: 0.4rem;
`;

const PhotoFrame = styled.div`
  position: relative;
  width: 100%;
  padding-top: calc(100% * 17 / 11); /* 11:17 aspect ratio */
  background-color: #e0e0e0;
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  right: 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #e0e0e0;
  cursor: pointer;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const BackgroundComponent = () => {
  return (
    <BinderContainer>
      <Paper>
        <Holes>
          {[...Array(6)].map((_, i) => (
            <Hole key={i} />
          ))}
        </Holes>
        <PhotoSlot>
          <PhotoGroup>
            {[...Array(4)].map((_, i) => (
              <PhotoFrame key={i}></PhotoFrame>
            ))}
          </PhotoGroup>
          <ButtonGroup>
            <Button>선택</Button>
            <Button>삭제</Button>
            <Button>취소</Button>
          </ButtonGroup>
        </PhotoSlot>
      </Paper>
    </BinderContainer>
  );
};

export default BackgroundComponent;
