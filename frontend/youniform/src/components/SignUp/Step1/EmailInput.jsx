import React, { useState, useEffect, useRef } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import ColorBtn from "../../Common/ColorBtn";
import StatusMessageForm from "../StatusMessageForm";
import signUpStore from "@stores/signUpStore";

const InputEmail = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const CheckEmail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const TimerDisplay = styled.span`
  font-size: 14px;
  color: #ff4949;
  margin-left: 10px;
  width: 38%;
`;

const EmailInput = ({ emailInput, setEmailInput, statusMsg, setStatusMsg }) => {
  const { user, setEmail, setIsVerified, sendEmail, verifyEmailCode } = signUpStore(state => ({
    user: state.user,
    setEmail: state.user.setEmail,
    setIsVerified: state.user.setIsVerified,
    sendEmail: state.sendEmail,
    verifyEmailCode: state.verifyEmailCode,
  }));

  const [currency, setCurrency] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [authenticCode, setAuthenticCode] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  let fullEmail = "";

  const customDomainRef = useRef(null);

  useEffect(() => {
    if (isCustomDomain && customDomainRef.current) {
      customDomainRef.current.focus();
    }
  }, [isCustomDomain]);

  useEffect(() => {
    if (expiryTime) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = expiryTime - now;

        if (timeLeft <= 0) {
          clearInterval(intervalId);
          setRemainingTime("시간 만료");
          setIsEmailSent(false);
          setIsVerified(false);
        } else {
          const minutes = Math.floor(timeLeft / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          setRemainingTime(`${minutes}분 ${seconds}초`);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [expiryTime]);

  const handleEmailChange = (event) => {
    setIsEmailSent(false);
    setEmailInput(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    const value = event.target.value;
    setCurrency(value);
    setIsEmailSent(false);
    if (value === "custom") {
      setIsCustomDomain(true);
      setCurrency("");
      if (customDomainRef.current) {
        customDomainRef.current.focus();
      }
    } else {
      setIsCustomDomain(false);
    }
  };

  const handleCustomDomainChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCodeChange = (event) => {
    setAuthenticCode(event.target.value);
  };

  const confirmCode = async () => {
    fullEmail = isCustomDomain ? `${emailInput}@${currency}` : `${emailInput}@${currency}`;
    const result = await verifyEmailCode(fullEmail, authenticCode);
    if (result === "$SUCCESS") {
      setIsVerified(true);
      setExpiryTime(null); // 인증이 완료되면 타이머 중지
    } else {
      alert("잘못된 인증 코드입니다.");
    }
  };

  const processEmailAndFetch = async () => {
    if (emailInput.length === 0 || currency.length === 0) {
      setStatusMsg("아이디와 도메인을 모두 입력해주세요.");
      return;
    }

    fullEmail = isCustomDomain ? `${emailInput}@${currency}` : `${emailInput}@${currency}`;
    const result = await sendEmail(fullEmail);

    if (result === "$OK") {
      alert("인증 메일이 발송되었습니다!");
      setStatusMsg(null);
      setIsEmailSent(true);
      setIsVerified(false);
      setEmail(fullEmail);
      const now = new Date().getTime();
      setExpiryTime(now + 180000); // 현재 시간 + 3분
    } else {
      if (result.response.data.header.message === "이미 사용중인 이메일입니다.") {
        setStatusMsg("중복된 아이디입니다. 다른 아이디로 시도해주세요.");
      } else {
        setStatusMsg("잘못된 요청입니다. 다시 시도해주세요.");
      }
    }
  };

  const currencies = [
    { value: "naver.com", label: "naver.com", display: "naver" },
    { value: "gmail.com", label: "gmail.com", display: "gmail" },
    { value: "hanmail.net", label: "hanmail.net", display: "hanmail" },
    { value: "nate.com", label: "nate.com", display: "nate" },
    { value: "custom", label: "", display: "직접입력" },
  ];

  const isButtonDisabled = (!(emailInput.length > 0 && (currency.length > 0 || isCustomDomain))) || isEmailSent;

  return (
    <>
      {/* 도메인 */}
      <InputEmail>
        <TextField
          sx={{ width: "30%" }}
          label="이메일"
          value={emailInput}
          onChange={handleEmailChange}
        />
        <span>@</span>
        <TextField
          inputRef={customDomainRef}
          disabled={!isCustomDomain}
          value={currency}
          onChange={handleCustomDomainChange}
          sx={{
            width: "37%",
            backgroundColor: isCustomDomain ? "#FFFFFF" : "#F4F4F4",
          }}
        />
        {/* 도메인 드롭다운 */}
        <TextField
          label="선택"
          id="outlined-select-currency"
          select
          value={isCustomDomain ? "custom" : currency}
          onChange={handleCurrencyChange}
          sx={{
            width: "33%",
            backgroundColor: isCustomDomain ? "#F4F4F4" : "#FFFFFF",
          }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.display}
            </MenuItem>
          ))}
        </TextField>
      </InputEmail>
      <CheckEmail>
        <div>
          {statusMsg && <StatusMessageForm statusMsg={statusMsg} />}
        </div>
        <ColorBtn
          variant="contained"
          onClick={processEmailAndFetch}
          disabled={isButtonDisabled}
          style={{ width: "45%" }}
        >
          인증 메일 발송
        </ColorBtn>
      </CheckEmail>
      <TextField
        sx={{ width: "100%" }}
        label="인증번호 입력"
        value={authenticCode}
        onChange={handleCodeChange}
        disabled={
          user.isVerified || !isEmailSent || remainingTime === "시간 만료"
        }
        InputProps={{
          endAdornment: (
            <>
              {isEmailSent && <TimerDisplay>{remainingTime}</TimerDisplay>}
              <Button
                variant="contained"
                onClick={confirmCode}
                disabled={
                  user.isVerified ||
                  !isEmailSent ||
                  remainingTime === "시간 만료"
                }
                sx={{ height: "30px" }}
              >
                {user.isVerified ? <CheckIcon /> : "확인"}
              </Button>
            </>
          ),
        }}
      />
    </>
  );
};

export default EmailInput;
