import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import coverimg from "@assets/photocard/cover2.png";

const rotateAnimation = keyframes`
  from {
    transform: rotateY(0);
    opacity: 1;
  }
  to {
    transform: rotateY(-180deg);
    opacity: 0;
  }
`;

const CoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-origin: left center;
  transition-duration: 1s;
  transition-timing-function: ease-in;

  &.animate {
    animation: ${rotateAnimation} 2s forwards;
  }
`;

const BinderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  width: 85%;
  background-color: #f5f5f5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Paper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 3px 4px 6px 0px rgba(0, 0, 0, 0.25);
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
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-left: auto;
  width: calc(100% - 30px);
`;

const PhotoGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  width: 90%;
  height: 80%;
  margin-top: 10%;
  margin-left: 3%;
  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    z-index: 1;
  }

  &:before {
    top: 50.5%;
    left: 0;
    right: 0;
    height: 0px;
    border-top: 1px dashed rgba(0, 0, 0, 0.25);
    transform: translateY(-50%);
  }

  &:after {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    border-left: 1px dashed rgba(0, 0, 0, 0.25);
    transform: translateX(-50%);
  }
`;

const PhotoFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: calc(100% * 17 / 11); /* 11:17 */
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

const Binder = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <BinderContainer>
      <CoverImage src={coverimg} className={animate ? 'animate' : ''} />
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

export default Binder;
