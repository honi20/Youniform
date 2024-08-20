import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CompleteIcon from '@assets/Icons/Complete.svg?react';
import NextStepButton from './Step1/NextStepButton';

const StepFinal = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: center;    /* 수평 정렬 (가로 가운데) */
  height: 100%;
  text-align: center; /* 텍스트 중앙 정렬 */
  gap: 1.5rem;
`;

const EmptyBox = styled.div`
  height: 1.5rem;
`;

const StepIndicatorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  margin-bottom: 3rem;
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#262F66" : "#e0e0e0")};
  color: ${(props) => (props.$active ? "#fff" : "#9e9e9e")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: background-color 0.4s ease-in-out;
`;

const StepBar = styled.div`
  width: 23px;
  height: 1px;
  background-image: linear-gradient(to right, ${"#a1a1a1"} 50%, transparent 50%);
  background-size: 8px 2px;
  background-repeat: repeat-x;
  margin: 0 8px;
`;

const Message = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-top: 10px; /* 기본 여백 제거 (선택적) */
`;

const BtnWrap = styled.div`
  display: flex;
  position: relative;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin-top: 2rem; /* 추가: 버튼과 위 요소 간의 간격 */
`;

const SocialSignUpSuccess = () => {
  const location = useLocation();
  const { isStepFour } = location.state || {};
  return (
    <StepFinal>
      {isStepFour &&
      <>
        <EmptyBox />
        <StepIndicatorBox $step="4">
          {[1, 2, 3, 4].map((num, index) => (
            <React.Fragment key={index}>
              <StepCircle $active={num === 4}>{num}</StepCircle>
              {num < 4 && <StepBar $active={num < 4} />}
            </React.Fragment>
          ))}
        </StepIndicatorBox>
      </>
      }
      <CompleteIcon />
      <Message>회원가입 성공!</Message>
      <BtnWrap>
        <NextStepButton step="success" />
      </BtnWrap>
    </StepFinal>
  );
};

export default SocialSignUpSuccess;
