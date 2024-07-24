import React from 'react'
import Calendar from '../components/Calendar'
import styled from 'styled-components'
import DiaryFriendsList from '../components/Diary/DiaryFriendsList'

import { Link } from 'react-router-dom'

const DiaryHome = styled.div`
  position: relative;
  width: 100%;
  margin-top: 49px;
  background-color : #ffffff;
`

const FriendsContainer = styled.div`
  border: 1px solid orange;
`

const CalendarContainer = styled.div`

`

const DiaryHomeView = () => {
  return (
    <DiaryHome>
      <FriendsContainer>
        <DiaryFriendsList />
      </FriendsContainer>
      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
    </DiaryHome>
  )
}

export default DiaryHomeView
