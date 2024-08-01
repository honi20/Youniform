import React, { useState, useRef, useEffect } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import ColorBtn from '../Common/ColorBtn';
import StatusMessageForm from './StatusMessageForm';

const InputEmail = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const CheckEmail = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const TimerDisplay = styled.span`
  font-size: 14px;
  color: #FF4949;
  margin-left: 10px;
  width: 38%;
`;

const EmailInput = () => {
  const [email, setEmail] = useState('');
  const [currency, setCurrency] = useState('');
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [statusMsg, setStatusMsg] = useState('아이디(이메일)를 입력하세요.');
  const [authenticCode, setAuthenticCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [expiryTime, setExpiryTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  const customDomainRef = useRef(null);

  useEffect(() => {
    if (isCustomDomain && customDomainRef.current) {
      customDomainRef.current.focus();
    }
  }, [isCustomDomain]);

  useEffect(() => {
    if (email.length > 0) {
      if (isCustomDomain && currency.length > 0) {
        setStatusMsg('사용할 수 있는 아이디입니다.');
      } else if (!isCustomDomain && currency.length > 0) {
        setStatusMsg('사용할 수 있는 아이디입니다.');
      } else {
        setStatusMsg('아이디(이메일)를 입력하세요.');
      }
    } else {
      setStatusMsg('아이디(이메일)를 입력하세요.');
    }
  }, [email, currency, isCustomDomain]);

  useEffect(() => {
    if (expiryTime) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = expiryTime - now;

        if (timeLeft <= 0) {
          clearInterval(intervalId);
          setRemainingTime('시간 만료');
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
    setEmail(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    const value = event.target.value;
    setCurrency(value);

    if (value === 'custom') {
      setIsCustomDomain(true);
      setCurrency('');
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

  const sendEmail = () => {
    alert('인증 메일이 발송되었습니다!');
    setIsEmailSent(true);
    setIsVerified(false);
    const now = new Date().getTime();
    setExpiryTime(now + 180000); // 현재 시간 + 3분
  };

  const handleCodeChange = (event) => {
    setAuthenticCode(event.target.value);
  };

  const confirmCode = () => {
    // 코드 수정 필요 (임시)
    if (authenticCode === 'ABCD') {
      setIsVerified(true);
      setExpiryTime(null); // 인증이 완료되면 타이머 중지
    } else {
      alert('잘못된 인증 코드입니다.');
    }
  };

  const currencies = [
    { value: 'naver.com', label: 'naver.com', display: 'naver' },
    { value: 'gmail.com', label: 'gmail.com', display: 'gmail' },
    { value: 'hanmail.net', label: 'hanmail.net', display: 'hanmail' },
    { value: 'nate.com', label: 'nate.com', display: 'nate' },
    { value: 'custom', label: '', display: '직접입력' }
  ];

  return (
    <>
      {/* 도메인 */}
      <InputEmail>
        <TextField
          sx={{ width: "30%" }}
          label="이메일"
          value={email}
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
            backgroundColor: isCustomDomain ? '#FFFFFF' : '#F4F4F4'
          }}
        />
        {/* 도메인 드롭다운 */}
        <TextField
          label="선택"
          id="outlined-select-currency"
          select
          value={isCustomDomain ? 'custom' : currency}
          onChange={handleCurrencyChange}
          sx={{
            width: "33%",
            backgroundColor: isCustomDomain ? '#F4F4F4' : '#FFFFFF'
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
        <StatusMessageForm statusMsg={statusMsg} />
        <ColorBtn
          variant="contained"
          onClick={sendEmail}
          disabled={statusMsg !== '사용할 수 있는 아이디입니다.'}
          style={{ width: "55%" }}
        >
          인증 메일 발송
        </ColorBtn>
      </CheckEmail>
      <TextField
        sx={{ width: "100%" }}
        label="인증번호 입력"
        value={authenticCode}
        onChange={handleCodeChange}
        disabled={isVerified || !isEmailSent || remainingTime == '시간 만료'} // 인증 완료 시, 인증 메일 발송 전 비활성화
        InputProps={{
          endAdornment: (
            <>
              {isEmailSent && <TimerDisplay>{remainingTime}</TimerDisplay>}
              <Button
                variant="contained"
                onClick={confirmCode}
                disabled={isVerified || !isEmailSent || remainingTime == '시간 만료'}
                sx={{ height: "30px" }}
              >
                {isVerified ? <CheckIcon /> : '확인'}
              </Button>
            </>
          ),
        }}
      />
    </>
  );
};

export default EmailInput;
