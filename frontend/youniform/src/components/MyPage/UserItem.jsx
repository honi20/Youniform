// components/UserItem.js
import React from "react";
import styled from "styled-components";
import * as Font from "@/typography";

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const IconWrapper = styled(FlexBox)`
  height: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #9d9d9d1a;
  margin-bottom: 10px;
`;
const UserItemContainer = styled(FlexBox)`
  ${Font.Small}
  width: 32%;
  flex-direction: column;
`;
const UserItem = ({ icon: Icon, text, onClick }) => (
  <UserItemContainer onClick={onClick}>
    <IconWrapper>
      <Icon />
    </IconWrapper>
    {text}
  </UserItemContainer>
);

export default UserItem;
