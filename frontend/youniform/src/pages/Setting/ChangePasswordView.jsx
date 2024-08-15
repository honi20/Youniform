import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LogoWithTitle from "./Share/LogoWithTitle";
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

const ChangePasswordContainer = styled.div`
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10% 0;
  gap: 5%;
  align-items: center;
`;

const ChangePasswordView = () => {

  const navigate = useNavigate();
  const { changePassword } = useUserStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  
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
    <ChangePasswordContainer>
      <LogoWithTitle state="ChangePassword" />
      <FormControl sx={{ width: "80%" }} variant="outlined">
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
      <FormControl sx={{ width: "80%" }} variant="outlined">
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
      <FormControl sx={{ width: "80%" }} variant="outlined">
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
    </ChangePasswordContainer>
  );
};

export default ChangePasswordView;
