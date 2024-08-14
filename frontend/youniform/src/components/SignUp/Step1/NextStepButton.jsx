import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSignUpStore from "@stores/signUpStore";
import useUserStore from "../../../stores/userStore";

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
  const { setAccessToken } = useUserStore();
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
          console.log(res);
          if (res === "$SUCCESS") {
            // const token = res.body.accessToken;
            // await setAccessToken(token);
            navigate(`/sign-up/step-4`);
          }
        }
        break;
      case "4":
        navigate(`/`);
        return;
    }

    // if (nextStep) {
    //   navigate(`/sign-up/step-${nextStep}`);
    // }
  };

  return (
    <NextStepBtn onClick={handleNextStep}>
      {step === "4" ? "확인" : "다음 단계로"}
    </NextStepBtn>
  );
};

export default NextStepButton;
