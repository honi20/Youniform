import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    width: 100%;
`

const CommunityView = () => {
  return (
    <Div>
      <Link to="/diary-detail">
        <button>Detail</button>
      </Link>
      <Link to="/write-diary">
        <button>Write</button>
      </Link>
    </Div>
  )
}

export default CommunityView
