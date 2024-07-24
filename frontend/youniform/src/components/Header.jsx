import React from 'react'
import styled from 'styled-components';

import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';

const Head = styled.div`
    background-color: #F8F8F8;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    // border: 1px solid orange;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`

const InnerHead = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 92%;
  margin: 0 auto;
  gap: 5px;
`

const Header = () => {
  return (
    <Head>
      <InnerHead>
        <SportsBaseballIcon />
        <strong>Youniform</strong>
      </InnerHead>
    </Head>
  )
}

export default Header
