import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import GoogleIcon from '../assets/login/google.png';
import KakaoIcon from '../assets/login/kakao.png';
import NaverIcon from '../assets/login/naver.png';

import { styled as muiStyled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginViewContainer = styled.div`
  display: table;
  width: 100%;
  height: 100%;
  background-color: #F8F8F8;
`
  
  const LoginContent = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
`

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
`

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 10%;
  margin-bottom: 20px;
`

const FindBox = styled.div`
  display: flex;
  padding: 0 10%;
  align-items: center;
  color: black;
  justify-content: flex-end;
  margin-bottom: 20%;
`

const VerticalBar = styled.div`
  display: inline-block;
  width: 1px;
  height: 1rem;
  background-color: grey;
  margin: 0 10px;
`

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

const SocialLogin = styled.div`
`

const SocialLoginText = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
`

const Bar = styled.div`
  display: block;
  width: 40px;
  height: 1px;
  background-color: grey;
`

const LoginLinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 25px;
  margin-bottom: 60px;
`

const LoginIcon = styled.img`
  width: 60px;
`;

const LoginView = () => {

  const ColorBtn = muiStyled(Button)(() => ({
    backgroundColor: "rgb(124, 124, 124)",
    fontSize: "15px",
    fontWeight: "600",
  //   '&:hover': {
  //   backgroundColor: "rgb(1, 1, 1)",
  // },
  }));

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

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
            <TextField sx={{ width: "100%" }} label="Email" />
          </div>
          <div>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
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
          </div>
          {/* login button */}
          <ColorBtn sx={{ width: "100%" }} variant="contained">로그인</ColorBtn>
        </InputForm>
        {/* 이메일 / 비밀번호 찾기 */}
        <FindBox>
          <StyledLink to="find-email">이메일 찾기</StyledLink>
          <VerticalBar/>
          <StyledLink to="find-password">비밀번호 찾기</StyledLink>
          <VerticalBar/>
          <StyledLink to="/sign-up">회원가입</StyledLink>
        </FindBox>
        {/* 소셜 로그인 */}
        <SocialLogin>
          <SocialLoginText>
              <Bar/>
              <span>SNS 계정으로 시작하기</span>
              <Bar/>
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
}

export default LoginView;
