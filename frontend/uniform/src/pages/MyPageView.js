import React from 'react';
import { Link } from 'react-router-dom';

const MyPageView = () => {
  const isLogin = false;
  return (
    <>
      <div>
        My Page View
      </div>
      {isLogin ? (
        <button>LOGOUT</button>
      ) : (
        <Link to="/login">LOGIN</Link>
      )}
    </>
  );
}

export default MyPageView;
