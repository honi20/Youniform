import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSignUpStore from "@stores/signUpStore";

const NextStepBtn = styled.div`
  width: 100%;
  max-width: 400px;
  height: 8vh;
  border-radius: 20px;
  background-color: #262f66;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 120px;
  z-index: 1;
`;

const NextStepButton = ({ step, isPasswordVerified, isPasswordMatch }) => {
  const { user, isVerified, fetchLocalSignUp } = useSignUpStore();
  const navigate = useNavigate();

  const handleNextStep = async () => {
    let nextStep;
    switch (step) {
      case "1":
        if (isVerified && isPasswordVerified, isPasswordMatch) {
          navigate(`/sign-up/step-2`);
          return;
        }
        break;
      case "2":
        if (user.isNicknameUnique && [...user.introduce].length <= 20) {
          navigate(`/sign-up/step-3`);
        }
        break;
      case "3":
        if (user.players.length > 0) {
          const res = await fetchLocalSignUp();
          if (res === "$SUCCESS") {
            navigate(`/sign-up/step-4`);
          }
        }
        break;
      case "4":
        window.dispatchEvent(new Event("storage"));
        navigate(`/`);
        return;
    }

    // if (nextStep) {
    //   navigate(`/sign-up/step-${nextStep}`);
    // }
  };

  return (
    <NextStepBtn onClick={handleNextStep}>
      {step === '4' ? "홈으로" : "다음 단계로"}
    </NextStepBtn>
  );
};

export default NextStepButton;
