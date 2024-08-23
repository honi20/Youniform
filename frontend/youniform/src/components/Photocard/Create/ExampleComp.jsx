import React from 'react'
import styled from 'styled-components';
import CloseSvg from "@assets/Diary/close.svg?react";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const Container = styled.div`
  border-radius: 1.25rem;
  width: 80%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 5%;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;
const Img = styled.img`
    width: 300px;
    margin-top: 20px;

`
const ExampleModal = ({ isOn, setIsOn }) => {
    const handleCloseBtn = () => {
        setIsOn(false)
        // console.log('test')
    }
  return (
    <ModalBackdrop>
      <Container>
          <CloseButton onClick={handleCloseBtn}><CloseSvg /></CloseButton>
          <Img src='https://dsfjel9nvktdp.cloudfront.net/asset/photocard_ex.png'/>
      </Container>
    </ModalBackdrop>
  )
}

export default ExampleModal