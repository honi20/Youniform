import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSignUpStore from "@stores/signUpStore";

const NextStepBtn = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #262f66;
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
  const { step, setStep, user, fetchLocalSignUp } = useSignUpStore();
  const navigate = useNavigate();

  const handleNextStep = async () => {
    let nextStep;
    switch (step) {
      case 1:
        if (user.isVerified && user.isPwVerified) {
          setStep(2);
          nextStep = 2;
        }
        break;
      case 2:
        if (user.isNicknameUnique && [...user.introduce].length <= 20) {
          setStep(3);
          nextStep = 3;
        }
        break;
      case 3:
        if (user.players.length > 0) {
          nextStep = 4;
          setStep(4);
          const res = await fetchLocalSignUp();
        }
        break;
      case 4:
        // 마지막 단계는 별도 설정
        setStep(1);
        navigate(`/`);
        return;
      default:
        nextStep = 1;
        break;
    }

    if (nextStep) {
      navigate(`/sign-up/step-${nextStep}`);
    }
  };

  return (
    <NextStepBtn onClick={handleNextStep}>
      {step == 4 ? "홈으로" : "다음 단계로"}
    </NextStepBtn>
  );
};

export default NextStepButton;
