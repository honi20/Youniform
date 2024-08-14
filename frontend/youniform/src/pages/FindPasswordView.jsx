import { useState } from "react";
import BasicModal from "@components/Modal/BasicModal";
import styled from "styled-components";

import { styled as muiStyled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import useUserStore from "@stores/userStore";
import { useNavigate } from "react-router-dom";

const FindPassword = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 70px);
  align-items: center;
`;
const LoginLogo = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 5px;
  margin-bottom: 20px;
`;

const FindPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -1px;
  color: #000078;
`;

const SubTitle = styled.span`
  font-size: 14px;
  margin-bottom: 2rem;
`;

const ColorBtn = muiStyled(Button)(() => ({
  backgroundColor: "rgb(124, 124, 124)",
  fontSize: "15px",
  fontWeight: "600",
}));

const FindPasswordView = () => {
  const navigate = useNavigate();
  const { findPassword } = useUserStore();
  const [email, setEmail] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  const openSentSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSentSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const openSentFailureModal = () => setIsFailureModalOpen(true);
  const closeSentFailureModal = () => {
    setIsFailureModalOpen(false);
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const fetchFindPassword = async () => {
    const res = await findPassword(email);
    if (res === "$OK") {
      openSentSuccessModal();
    } else {
      openSentFailureModal();
      setEmail("");
    }
  };
  
  const handleAfterCheck = () => {
    navigate("/login");
  };

  return (
    <FindPassword>
      <LoginLogo>
        <SportsBaseballIcon />
        <span>Youniform</span>
      </LoginLogo>
      <FindPasswordContainer>
        <Title>비밀번호 찾기</Title>
        <SubTitle>가입한 아이디(이메일)을 입력해주세요.</SubTitle>
        <TextField
          sx={{ width: "80%" }}
          label="이메일 입력"
          value={email}
          onChange={handleInputChange}
        />
        <ColorBtn
          variant="contained"
          onClick={fetchFindPassword}
          style={{ width: "80%" }}
        >
          인증 메일 발송
        </ColorBtn>
      </FindPasswordContainer>
      <BasicModal
        state={"EmailSentSuccess"}
        isOpen={isSuccessModalOpen}
        onClose={closeSentSuccessModal}
        onButtonClick={() => handleAfterCheck()}
      />
      <BasicModal
        state={"EmailSentFailure"}
        isOpen={isFailureModalOpen}
        onClose={closeSentFailureModal}
      />
    </FindPassword>
  );
};

export default FindPasswordView;
