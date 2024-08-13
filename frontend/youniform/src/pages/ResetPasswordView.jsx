import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { Margin, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

import useUserStore from "@stores/userStore";
import BasicModal from "@components/Modal/BasicModal";
import StatusMessageForm from "@components/SignUp/StatusMessageForm";

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
  width: 80%;
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

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const { resetPassword } = useUserStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // 모달
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  useEffect(() => {
    const match = isPwVerified && password === confirmPassword;
    setIsPasswordMatch(match);
  }, [password, confirmPassword, isPwVerified]);

  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const openFailureModal = () => setIsFailureModalOpen(true);
  const closeFailureModal = () => {
    setIsFailureModalOpen(false);
  };

  const validatePassword = (inputPw) => {
    const lengthCheck = inputPw.length >= 8 && inputPw.length <= 16;
    const numberCheck = /[0-9]/.test(inputPw);
    const charCheck = /[!@#$%^&*(),.?":{}|<>]/.test(inputPw);

    return lengthCheck && numberCheck && charCheck;
  };

  const handlePwChange = (prop) => (event) => {
    const value = event.target.value;
    switch (prop) {
      case "password":
        setPassword(value);
        if (!validatePassword(value)) {
          setPasswordError(
            "비밀번호는 8자 이상 16자 이하의 영문으로, 숫자 및 특수문자를 하나 이상 포함해야 합니다."
          );
        } else {
          setIsPwVerified(true);
          setPasswordError("");
        }
        break;
      case "confirmPw":
        setConfirmPassword(value);
        break;
    }
  };

  const handleVerifyCodeChange = (event) => {
    setVerifyCode(event.target.value);
  };

  const fetchResetPassword = async () => {
    if (verifyCode.length <= 0) {
      // 모달창 열기
      return;
    }
    const res = await resetPassword(
      uuid,
      verifyCode,
      password,
      confirmPassword
    );
    if (res === "$SUCCESS") {
      openSuccessModal();
    } else {
      openFailureModal();
    }
  };

  const handleClickShowPassword = (key) => {
    switch (key) {
      case "showPassword":
        setShowPassword(!showPassword);
        break;
      case "showConfirmPw":
        setShowConfirmPw(!showConfirmPw);
        break;
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAfterCheck = (state, index) => {
    switch (state) {
      case "ResetPassword":
        navigate("/login");
        break;
      case "ResetPasswordFailure":
        setPassword("");
        break;
    }
  };

  return (
    <form>
      <FindPassword>
        <LoginLogo>
          <SportsBaseballIcon />
          <span>Youniform</span>
        </LoginLogo>
        <FindPasswordContainer>
          <Title>비밀번호 재설정</Title>
          <SubTitle>새 비밀번호와 인증 번호를 입력해주세요.</SubTitle>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <TextField
              autoComplete="off"
              label="새 비밀번호"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePwChange("password")}
              error={passwordError.length > 0}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("showPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ paddingRight: "12px" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <TextField
              autoComplete="off"
              label="새 비밀번호 확인"
              variant="outlined"
              type={showConfirmPw ? "text" : "password"}
              value={confirmPassword}
              onChange={handlePwChange("confirmPw")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("showConfirmPw")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ paddingRight: "12px" }}
                    >
                      {showConfirmPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </FormControl>
          {/* {(user.password.length <= 0 || user.confirmPw.length <= 0) ? (
          <StatusMessageForm statusMsg='비밀번호 정보를 입력하세요.' />
        ) : ( */}
          {password.length > 0 &&
            confirmPassword.length > 0 &&
            isPwVerified &&
            !isPasswordMatch && (
              <StatusMessageForm
                style={{ width: "100%", margin: "0 auto" }}
                statusMsg="비밀번호 정보가 일치하지 않습니다."
              />
            )}
          <TextField
            sx={{ width: "100%" }}
            label="인증 번호"
            value={verifyCode}
            onChange={handleVerifyCodeChange}
          />
          <ColorBtn
            variant="contained"
            onClick={fetchResetPassword}
            style={{ width: "100%" }}
          >
            완료
          </ColorBtn>
        </FindPasswordContainer>
        {/* 비밀번호 수정 성공 / 변경된 비밀번호로 로그인하세요. */}
        <BasicModal
          state={"ResetPassword"}
          isOpen={isSuccessModalOpen}
          onClose={closeSuccessModal}
          onButtonClick={(index) => handleAfterCheck("ResetPassword", index)}
        />
        {/* 비밀번호 수정 실패 / 정확한 인증 코드를 입력해주세요. */}
        <BasicModal
          state={"ResetPasswordFailure"}
          isOpen={isFailureModalOpen}
          onClose={closeFailureModal}
          onButtonClick={(index) =>
            handleAfterCheck("ResetPasswordFailure", index)
          }
        />
      </FindPassword>
    </form>
  );
};

export default ResetPasswordView;
