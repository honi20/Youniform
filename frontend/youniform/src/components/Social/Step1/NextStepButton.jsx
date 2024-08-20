import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
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

const NextStepButton = ({ step, email, providerType, profileImage }) => {
  const { user, setTeam, fetchSocialSignUp } = useSignUpStore();
  const navigate = useNavigate();

  const handleNextStep = async () => {
    let nextStep;
    switch (step) {
      case "1":
        user.providerType = providerType;
        user.email = email;
        if (user.email && user.providerType && user.isNicknameUnique && [...user.introduce].length <= 20) {
          navigate(`/social/sign-up/step-2`);
          return;
        }
        break;
      case "2":
        if (selectedTeam === 1000) { // 몬스터즈
          navigate(`/social/sign-up/step-3`);
        } else {  // 이 외 구단
          setTeam(selectedTeam);
          const res = await fetchSocialSignUp();
          console.log(res);
          if (res === "$SUCCESS") {
            navigate(`/sign-up/success`, { state: { isStepFour: true } });
          }
        }
      break;
        case "3":
        if (user.players.length > 0) {
          const res = await fetchSocialSignUp();
          console.log(res);
          if (res === "$SUCCESS") {
            navigate(`/social/sign-up/success`);
          }
        }
        break;
      case "3":
        navigate(`/main`);
      return;
      case "success":
        window.dispatchEvent(new Event("storage"));
        navigate(`/main`);
      break;
    }

    // if (nextStep) {
    //   navigate(`/sign-up/step-${nextStep}`);
    // }
  };

  return (
    <NextStepBtn onClick={handleNextStep}>
      {step === '3' ? "홈으로" : "다음 단계로"}
    </NextStepBtn>
  );
};

export default NextStepButton;
