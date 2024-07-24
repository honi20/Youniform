import React from 'react'
import styled from 'styled-components'

const ListContainer = styled.div`
  background-color : #EDEDED;
  width: 100%;
  height: 80px;
`
const FriendsList = styled.div`
  width: 92%;
  margin: 0 auto;
`

const DiaryFriendsList = () => {
  return (
    <ListContainer>
      <FriendsList>
        Friends List View
      </FriendsList>
    </ListContainer>
  )
}

export default DiaryFriendsList
