import React, { useEffect, useState } from "react";
import { TextField, FormControl, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useSignUpStore from "@stores/signUpStore";
import StatusMessageForm from "../StatusMessageForm";
import styled from "styled-components";

const PasswordForm = styled.div`
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const PasswordInput = ({ isPasswordMatch, isPasswordVerified, setIsPasswordVerified, setIsPasswordMatch }) => {
  const { user, setPassword, setConfirmPw, setIsPwVerified } = useSignUpStore(
    (state) => ({
      user: state.user,
      setPassword: state.user.setPassword,
      setConfirmPw: state.user.setConfirmPw,
    })
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (inputPw) => {
    const lengthCheck = inputPw.length >= 8 && inputPw.length <= 16;
    const numberCheck = /[0-9]/.test(inputPw);
    const charCheck = /[!@#$%^&*(),.?":{}|<>]/.test(inputPw);

    return lengthCheck && numberCheck && charCheck;
  };

  useEffect(() => {
    if (user.password && user.confirmPw) {
      setIsPasswordMatch(user.password === user.confirmPw);
    }
  }, [user.password, user.confirmPw]);

  const handlePwChange = (prop) => (event) => {
    const value = event.target.value;
    switch (prop) {
      case "password":
        setPassword(value);
        if (!validatePassword(value)) {
          setPasswordError(
            "비밀번호는 8자 이상 16자 이하의 영문으로, 숫자 및 특수문자를 하나 이상 포함해야 합니다."
          );
          setIsPasswordVerified(false);
        } else {
          setPasswordError("");
          setIsPasswordVerified(true);
        }
        break;
      case "confirmPw":
        setConfirmPw(value);
        break;
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

  return (
    <form>
      <PasswordForm>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <TextField
            autoComplete="off"
            label="비밀번호 입력"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={user.password}
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
            label="비밀번호 확인"
            variant="outlined"
            type={showConfirmPw ? "text" : "password"}
            value={user.confirmPw}
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
        {isPasswordVerified && user.confirmPw.length > 0 && !isPasswordMatch && (
          <StatusMessageForm statusMsg="비밀번호 정보가 일치하지 않습니다." />
        )}
        {isPasswordVerified && user.confirmPw.length <= 0 && (
          <StatusMessageForm statusMsg="비밀번호 정보를 입력하세요." />
        )}
      </PasswordForm>
    </form>
  );
};

export default PasswordInput;
