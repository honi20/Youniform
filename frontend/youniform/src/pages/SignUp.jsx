import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSignUpStore from '../stores/signUpStore'; // zustand store import

import { styled as muiStyled } from '@mui/material/styles';
import { TextField, Button, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUpView = styled.div`
  display: table;
  width: 100%;
  height: 92vh;
`;

const SignUpFormContainer = styled.div`
  display: table-row;
  height: 100%;
`;

const SignUpForm = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-bottom: 50px;
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.$active ? '#262F66' : '#e0e0e0'};
  color: ${props => props.$active ? '#fff' : '#9e9e9e'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const StepBar = styled.div`
  width: 23px;
  height: 1px;
  background-image: linear-gradient(to right, ${'#e0e0e0'} 50%, transparent 50%);
  background-size: 8px 2px;
  background-repeat: repeat-x;
  margin: 0 8px;
`;

const SignUpText = styled.div`
  font-size: 1.7rem;
  font-weight: 800;
  color: #262F66;
  text-align: center;
  margin-top: 2.2rem;
  margin-bottom: 3.5rem;
  letter-spacing: -1px;
`;

const InputForm = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 15px;
`;

const InputEmail = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const ColorBtn = muiStyled(Button)(() => ({
  backgroundColor: "#D9D9D9",
  fontSize: "15px",
  boxShadow: 0,
  color: "#3A3A3A",
  width: "100%"
}));

const NextStepBtn = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #262F66;
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
`;

const SignUp = () => {
  const { step, setStep, currency, setCurrency, curDropdown, setCurDropdown, values, setValues, toggleShowPassword, isCustomDomain, setIsCustomDomain } = useSignUpStore();
  const customDomainRef = useRef(null);

  useEffect(() => {
    if (isCustomDomain && customDomainRef.current) {
      customDomainRef.current.focus();
    }
  }, [isCustomDomain]);

  const handlePwChange = (prop) => (event) => {
    setValues(prop, event.target.value);
  };

  const handleClickShowPassword = (key) => {
    toggleShowPassword(key);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setCurrency(value);

    if (value === 'custom') {
      setIsCustomDomain(true);
      setCurrency("");
      if (customDomainRef.current) {
        customDomainRef.current.focus();
      }
    } else {
      setIsCustomDomain(false);
    }
  };

  const handleNextStep = () => {
    setStep();
  };

  const sendEmail = () => {
    alert("인증 메일이 발송되었습니다!");
  };

  const currencies = [
    { value: 'naver.com', label: 'naver.com', display: 'naver' },
    { value: 'gmail.com', label: 'gmail.com', display: 'gmail' },
    { value: 'hanmail.net', label: 'hanmail.net', display: 'hanmail' },
    { value: 'nate.com', label: 'nate.com', display: 'nate' },
    { value: 'custom', label: '', display: '직접입력' }
  ];

  return (
    <SignUpView>
      <SignUpFormContainer>
        <SignUpForm>
          <StepIndicator>
            {[1, 2, 3, 4].map((num, index) => (
              <React.Fragment key={index}>
                <StepCircle $active={num === step}>{num}</StepCircle>
                {num < 4 && <StepBar $active={num < step} />}
              </React.Fragment>
            ))}
          </StepIndicator>
          <SignUpText>회원가입</SignUpText>
          <InputForm>
            {/* 이메일 입력 */}
            <InputEmail>
              <TextField sx={{ width: "30%" }} label="이메일" />
              <span>@</span>
              {/* 도메인 */}
              <TextField
                inputRef={customDomainRef}
                disabled={!isCustomDomain}
                value={currency} // 도메인 텍스트 필드의 값 설정
                onChange={(e) => setCurrency(e.target.value)} // 입력 변경 시 currency 업데이트
                sx={{ 
                  width: "35%",
                  backgroundColor: isCustomDomain ? '#FFFFFF' : '#F4F4F4'  // 배경 색상 변경
                }}
              />
              {/* 도메인 드롭박스 */}
              <TextField
                label="선택"
                id="outlined-select-currency"
                select
                value={isCustomDomain ? 'custom' : currency} // 드롭다운의 값 설정
                onChange={handleChange}
                sx={{
                  width: "29%",
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
            <ColorBtn variant="contained" onClick={sendEmail}>인증 메일 발송</ColorBtn>
            {/* 비밀번호 입력 */}
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">비밀번호 입력</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handlePwChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('showPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {/* 비밀번호 확인 */}
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-confirm-pw">비밀번호 확인</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-pw"
                type={values.showConfirmPw ? 'text' : 'password'}
                value={values.confirmPw}
                onChange={handlePwChange('confirmPw')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('showConfirmPw')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showConfirmPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </InputForm>
        </SignUpForm>
      </SignUpFormContainer>
      <NextStepBtn onClick={handleNextStep}>
        다음 단계로
      </NextStepBtn>
    </SignUpView>
  );
}

export default SignUp;
