import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background: #D9D9D9;
    position: fixed;
    bottom: 0;

    width: 100%;
    height: 50px;
    display: flex;

    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`

const NavBar = () => {
  return (
    <Nav>
      <div>
          <Link to="/">홈</Link>
      </div>
      <div>
          <Link to="/photo-card">포토카드</Link>
      </div>
      <div>
          <Link to="/diary">다이어리</Link>
      </div>
      <div>
          <Link to="/community">커뮤니티</Link>
      </div>
      <div>
          <Link to="/my-page">마이페이지</Link>
      </div>
    </Nav>
  )
}

export default NavBar
