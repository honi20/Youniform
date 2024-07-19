import React from 'react'
import styled from 'styled-components';

const Head = styled.div`
    background-color: #F8F8F8;
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    display: flex;
    border: solid 0.5px;

    > div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const Header = () => {
  return (
    <>
    <Head>test</Head>
    <div>
      Header
    </div>
    </>
  )
}

export default Header
