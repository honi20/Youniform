import React from 'react'
import styled from 'styled-components';
import useSignUpStore from '../../stores/signUpStore';

const StepIndicatorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => (props.$step === 1 || props.$step === 4 ? '15%' : '3%')};
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.$active ? '#262F66' : '#e0e0e0'};
  color: ${props => props.$active ? '#fff' : '#9e9e9e'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: background-color 0.4s ease-in-out;
`;

const StepBar = styled.div`
  width: 23px;
  height: 1px;
  background-image: linear-gradient(to right, ${'#a1a1a1'} 50%, transparent 50%);
  background-size: 8px 2px;
  background-repeat: repeat-x;
  margin: 0 8px;
`;

const StepIndicator = () => {
  const { step } = useSignUpStore();

  return (
    <StepIndicatorBox $step={step}>
          {[1, 2, 3, 4].map((num, index) => (
            <React.Fragment key={index}>
              <StepCircle $active={num === step}>{num}</StepCircle>
              {num < 4 && <StepBar $active={num < step} />}
            </React.Fragment>
          ))}
    </StepIndicatorBox>
  )
}

export default StepIndicator
