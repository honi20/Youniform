import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useSignUpStore from '../../../stores/signUpStore';

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
  z-index: 1;
`;

const NextStepButton = () => {
  const { step, setStep, user } = useSignUpStore();
  const navigate = useNavigate();

  const handleNextStep = () => {
    let nextStep;
    switch (step) {
      case 1:
        if (user.isVerified && user.isPwVerified) {
          nextStep = 2;
        }
        break;
      case 2:
        nextStep = 3;
        break;
      case 3:
        // 마지막 단계는 별도 설정
        
        break;
      default:
        nextStep = 1;
        break;
    }
    
    if (nextStep) {
      setStep(nextStep);
      navigate(`/sign-up/step-${nextStep}`);
    }
  };

  return (
    <NextStepBtn onClick={handleNextStep}>
      다음 단계로
    </NextStepBtn>
  );
}

export default NextStepButton;
