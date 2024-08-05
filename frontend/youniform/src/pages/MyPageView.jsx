import React from 'react';
import { Link } from 'react-router-dom';
import Profile from '@components/MyPage/Profile';
import styled from 'styled-components';

const Div = styled.div`
    border: 1px solid black;
    height: calc(100vh - 120px);
`

const MyPageView = () => {
  const isLogin = true;
  return (
    <>
      <Div>
        <Profile/>
      </Div>
      {isLogin ? (
        <button>LOGOUT</button>
      ) : (
        <Link to="/login">LOGIN</Link>
      )}
    </>
  );
}

export default MyPageView;
