import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useSignUpStore from '../../../stores/signUpStore';
import StatusMessageForm from '../StatusMessageForm';

const PasswordInput = () => {
  const { user, setPassword, setConfirmPw, setIsPwVerified } = useSignUpStore((state) => ({
    user: state.user,
    setPassword: state.user.setPassword,
    setConfirmPw: state.user.setConfirmPw,
    setIsPwVerified: state.user.setIsPwVerified
  }));

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  useEffect(() => {
    setIsPasswordMatch(user.password === user.confirmPw);
  }, [user.password, user.confirmPw]);

  const handlePwChange = (prop) => (event) => {
    switch (prop) {
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPw':
        setConfirmPw(event.target.value);
        break;
    }

    if (user.password === user.confirmPw) {
      // 기타 조건 만족할 때
      setIsPwVerified(true);
    }
  };

  const handleClickShowPassword = (key) => {
    switch (key) {
      case 'showPassword':
        setShowPassword(!showPassword);
        break;
      case 'showConfirmPw':
        setShowConfirmPw(!showConfirmPw);
        break;
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <TextField
          autoComplete='off'
          label="비밀번호 입력"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handlePwChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword('showPassword')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ paddingRight: '12px' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          fullWidth
        />
      </FormControl>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <TextField
          autoComplete='off'
          label="비밀번호 확인"
          variant="outlined"
          type={showConfirmPw ? 'text' : 'password'}
          value={user.confirmPw}
          onChange={handlePwChange('confirmPw')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword('showConfirmPw')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ paddingRight: '12px' }}
                >
                  {showConfirmPw ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </FormControl>
      {(user.password.length <= 0 || user.confirmPw.length <= 0) ? (
        <StatusMessageForm statusMsg='비밀번호 정보를 입력하세요.' />
      ) : (
        !isPasswordMatch && (
          <StatusMessageForm statusMsg='비밀번호 정보가 일치하지 않습니다.' />
        )
      )}
      </form>
    </>
  );
};

export default PasswordInput;
