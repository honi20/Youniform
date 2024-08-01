import React from 'react';
import styled from 'styled-components';
import useSignUpStore from '../../stores/signUpStore'

const NextStepBtn = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #262F66;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  margin-bottom: 70px;
`;

const NextStepButton = () => {
  const { step, setStep } = useSignUpStore();

  const handleNextStep = () => {
    switch (step) {
      case 1:
        
        break;
      case 2:
        
        break;
      case 3:
        
        break;
      default:
        break;
    }
    
    setStep();
  };

  return (
    <NextStepBtn onClick={handleNextStep}>
      다음 단계로
    </NextStepBtn>
  );
}

export default NextStepButton;
