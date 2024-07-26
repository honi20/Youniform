import React, { useState } from 'react';
import styled from 'styled-components';

// test
import User1 from '../../assets/Test/User/user_1.png';
import User2 from '../../assets/Test/User/user_2.png';
import User3 from '../../assets/Test/User/user_3.png';
import User4 from '../../assets/Test/User/user_4.png';
import User5 from '../../assets/Test/User/user_5.png';
import User6 from '../../assets/Test/User/user_6.png';

const UserInfo = [
  { id: 1, imgSrc: User1, nickName: '하츄핑', updateStatus: false },
  { id: 2, imgSrc: User2, nickName: '낭만고양이', updateStatus: false },
  { id: 3, imgSrc: User3, nickName: '스마트정대리', updateStatus: true },
  { id: 4, imgSrc: User4, nickName: 'krozv', updateStatus: true },
  { id: 5, imgSrc: User5, nickName: '테스트용긴유저네임', updateStatus: false },
  { id: 6, imgSrc: User6, nickName: '망곰베어스', updateStatus: true },
];

const ListContainer = styled.div`
  background-color: #EDEDED;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const FriendsList = styled.div`
  display: flex;
`;

const UserCard = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100px;
  width: 80px;
  background-color: ${props => props.$isSelected ? '#D9D9D9' : 'transparent'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: ${props => (props.$noneSelected || props.$isSelected) ? 1 : 0.3};
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #ffffff;
`;

const UserName = styled.div`
  text-align: center;
  font-size: 10px;
  margin-top: 4px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60px;
`;

const UpdateStatusCircle = styled.div`
  position: absolute;
  top: 57px;
  right: 13px;
  width: 13px;
  height: 13px;
  background-color: #F97D93;
  border: 1.5px solid white;
  border-radius: 50%;
  display: ${props => props.$updateStatus ? 'block' : 'none'};
`;

const DiaryFriendsList = ({ onUserClick }) => {
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  const handleUserClick = (index) => {
    UserInfo[index].updateStatus = false;
    setSelectedUserIndex(index);
    if (onUserClick) {
      onUserClick(UserInfo[index]);
    }
  };

  return (
    <ListContainer>
      <FriendsList>
        {UserInfo.map((user, index) => (
          <UserCard
            key={user.id}
            $isSelected={index === selectedUserIndex}
            $noneSelected={selectedUserIndex === null}
            onClick={() => handleUserClick(index)}
          >
            <UserImage src={user.imgSrc} alt={user.nickName} />
            <UpdateStatusCircle $updateStatus={user.updateStatus} />
            <UserName>{user.nickName}</UserName>
          </UserCard>
        ))}
      </FriendsList>
    </ListContainer>
  );
};

export default DiaryFriendsList;
