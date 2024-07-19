import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

const FindBox = styled.div`
  display: flex;
  align-items: center;
`

const VerticalBar = styled.div`
  display: inline-block;
  width: 1px;
  height: 1rem;
  background-color: black;
  margin: 0 10px;
`

const LoginView = () => {
  const ColorBtn = muiStyled(Button)(({ theme}) => ({
    backgroundColor: "rgb(124, 124, 124)",
    '&:hover': {
    backgroundColor: "rgb(1, 1, 1)",
  },
  }));
  return (
    <div>
      <h1>Login View.js</h1>
      <div>
        {/* id input */}
        <div>
          <TextField
              label="Email"
          />
        </div>
        {/* pw input */}
        <div>
          <TextField
            label="Password"
            type="password"
          />
        </div>
        {/* login button */}
        <ColorBtn variant="contained">로그인</ColorBtn>
        <FindBox>
          <Link to="find-email">이메일 찾기</Link>
          <VerticalBar/>
          <Link to="find-password">비밀번호 찾기</Link>
        </FindBox>
      </div>
    </div>
  );
}

export default LoginView;
