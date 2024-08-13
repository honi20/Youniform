import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUserStore from "@stores/userStore";
import usePhotoCardStore from "@stores/photoCardStore";

import GoogleIcon from "@assets/login/google.png";
import KakaoIcon from "@assets/login/kakao.png";
import NaverIcon from "@assets/login/naver.png";

import { styled as muiStyled } from "@mui/material/styles";
import { TextField, MenuItem, Button } from "@mui/material";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginViewContainer = styled.div`
  display: table;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
`;

const LoginContent = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
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

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 10%;
  margin-bottom: 20px;
`;

const InputEmail = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const FindBox = styled.div`
  display: flex;
  padding: 0 10%;
  align-items: center;
  color: black;
  justify-content: flex-end;
  margin-bottom: 20%;
`;

const VerticalBar = styled.div`
  display: inline-block;
  width: 1px;
  height: 1rem;
  background-color: grey;
  margin: 0 10px;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #848484;
  font-size: 14px;
  text-decoration: none;
  color: inherit;
  svg {
    margin-bottom: 4px; /* 아이콘과 텍스트 사이의 간격 조절 */
  }
`;

const SocialLogin = styled.div``;

const SocialLoginText = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
`;

const Bar = styled.div`
  display: block;
  width: 40px;
  height: 1px;
  background-color: grey;
`;

const LoginLinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 25px;
  margin-bottom: 60px;
`;

const LoginIcon = styled.img`
  width: 60px;
`;

const ColorBtn = muiStyled(Button)(() => ({
  backgroundColor: "rgb(124, 124, 124)",
  fontSize: "15px",
  fontWeight: "600",
}));

const LoginView = () => {
  const { fetchLogin, accessToken, clearAccessToken } = useUserStore();
  const { photoCards, setTotalPages, fetchPhotoCardList } = usePhotoCardStore();
  const [emailInput, setEmailInput] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [currency, setCurrency] = useState("");

  const navigate = useNavigate();

  const customDomainRef = useRef(null);

  let fullEmail = "";

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  // domains;
  const domains = [
    { value: "naver.com", label: "naver.com", display: "naver" },
    { value: "gmail.com", label: "gmail.com", display: "gmail" },
    { value: "hanmail.net", label: "hanmail.net", display: "hanmail" },
    { value: "nate.com", label: "nate.com", display: "nate" },
    { value: "custom", label: "", display: "직접입력" },
  ];

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleCustomDomainChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    const value = event.target.value;
    setCurrency(value);

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

  const handleLoginClick = async () => {
    fullEmail = isCustomDomain
      ? `${emailInput}@${currency}`
      : `${emailInput}@${currency}`;
    const result = await fetchLogin(fullEmail, values.password);
    if (result == "$FAIL") {
      alert("로그인에 실패하였습니다.");
    } else if (result === "$OK") {
      await fetchPhotoCardList();
      await setTotalPages(photoCards / 4 + 1);
      console.log(`로그인 성공`);
      navigate("/");
    }
  };

  // console.log(accessToken);

  return (
    <LoginViewContainer>
      <LoginContent>
        {/* 로고 */}
        <LoginLogo>
          <SportsBaseballIcon />
          <span>Youniform</span>
        </LoginLogo>
        {/* 인풋 & 로그인 버튼 */}
        <InputForm>
          <div>
            <InputEmail>
              <TextField
                sx={{ width: "30%" }}
                label="Email"
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
                {domains.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.display}
                  </MenuItem>
                ))}
              </TextField>
            </InputEmail>
          </div>
          <div>
            <form>
              {" "}
              {/* 콘솔 에러 제거용 form 태그 */}
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  autoComplete="off" // 콘솔 에러 제거
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </form>
          </div>
          {/* login button */}
          <ColorBtn
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleLoginClick}
          >
            로그인
          </ColorBtn>
        </InputForm>
        {/* 이메일 / 비밀번호 찾기 */}
        <FindBox>
          <StyledLink to="/find-password">비밀번호 찾기</StyledLink>
          <VerticalBar />
          <StyledLink to="/sign-up">회원가입</StyledLink>
        </FindBox>
        {/* 소셜 로그인 */}
        <SocialLogin>
          <SocialLoginText>
            <Bar />
            <span>SNS 계정으로 시작하기</span>
            <Bar />
          </SocialLoginText>
          <LoginLinkIcon>
            <LoginIcon src={KakaoIcon}></LoginIcon>
            <LoginIcon src={NaverIcon}></LoginIcon>
            <LoginIcon src={GoogleIcon}></LoginIcon>
          </LoginLinkIcon>
        </SocialLogin>
      </LoginContent>
    </LoginViewContainer>
  );
};

export default LoginView;
