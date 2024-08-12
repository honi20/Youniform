import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  /* border: 1px solid black; */
`;
const Container = styled.div`
  border-radius: 1.25rem;
  width: 90%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 5%;
  flex-direction: column;
  align-items: center;
`;
const ShareComp = () => {
  return (
    <>
      <ModalBackdrop>
        <Container></Container>
      </ModalBackdrop>
    </>
  );
};

export default ShareComp;
