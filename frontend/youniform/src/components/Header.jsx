import React from 'react'
import styled from 'styled-components';

const Head = styled.div`
    background-color: #F8F8F8;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0px 5px;

    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`
const Header = () => {
  return (
    <Head>Youniform</Head>
  )
}

export default Header
