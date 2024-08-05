import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import ProfileModal from "../Modal/ProfileModal";

const Container = styled.div`
  border: 0.5px solid #dadada;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 5% 8%;
  overflow-y: auto;
  cursor: pointer;
`;
const Header = styled.div`
  ${Font.Medium};
  margin: 2% 5%;
  padding: 1% 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid red; */
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid pink;
  cursor: pointer;
`;
const DateWrapper = styled(HeaderWrapper)`
  ${Font.Small}
  color: #848484;
  font-weight: 400;
`;
const ProfileImg = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 5px;
  border: 1px solid blue;
`;
const Content = styled.div`
  ${Font.Medium};
  font-weight: 400;
  margin: 1% 5%;
  /* border: 1px solid green; */
`;
const TagContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin-top: 2%;
  /* border: 1px solid blue; */
`;
const Tag = styled.div`
  ${Font.Small}
  font-weight: 400;
  border: 1px solid;
  border-radius: 1.25rem;
  padding: 0.2rem 0.5rem;
  margin: 0.1rem 0.2rem;
  color: #848484;
  border-color: #848484;
  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: white;
  }
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1% 3%;
  padding: 1%;
  border-top: 1px solid #9c9c9c;
`;
import Chatsvg from "@assets/Community/chat.svg?react";
const ChatIcon = styled(Chatsvg)`
  width: 24px;
  height: 24px;
`;
import HeartSvg from "@assets/Community/heart.svg?react";
const HeartIcon = styled(HeartSvg)`
  width: 24px;
  height: 24px;
`;
import BellSvg from "@assets/Community/bell.svg?react";
const BellIcon = styled(BellSvg)`
  width: 24px;
  height: 24px;
`;
import useUserStore from "@stores/userStore";
const Post = ({ post }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { friend, loading, error, fetchFriend, clearFriend } = useUserStore();

  const handleTagClick = (tag) => {
    console.log(tag.tagId);
    setSelectedTag(tag);
  };
  const convertBrToNewLine = (htmlString) => {
    return htmlString.split("<br>").join("\n");
  };

  const htmlContent = convertBrToNewLine(post.contents);

  const handleProfileClick = async () => {
    setSelectedUser(post.userId);
    await fetchFriend(post.userId);
    setModalOpen(true);
  };

  useEffect(() => {
    if (selectedUser) {
      return () => clearFriend();
    }
  }, [selectedUser, clearFriend]);
  return (
    <>
      <Container>
        <Header>
          <HeaderWrapper onClick={handleProfileClick}>
            <ProfileImg src={post.imageUrl} />
            {post.nickname}
          </HeaderWrapper>
          <DateWrapper>{post.createdAt}</DateWrapper>
        </Header>
        <Content>
          <div onClick={() => console.log("디테일 페이지", post.postId)}>
            {htmlContent.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <TagContainer>
            {post.tags.map((tag) => {
              return (
                <Tag key={tag.tagId} onClick={handleTagClick}>
                  # {tag.contents}
                </Tag>
              );
            })}
          </TagContainer>
        </Content>
        <Footer>
          <div
            style={{
              display: "flex",
              gap: "10%",
              justifyContent: "center",
            }}
          >
            <ChatIcon onClick={() => console.log("댓글창")} />
          </div>
          <div
            style={{
              display: "flex",
              gap: "10%",
              justifyContent: "center",
            }}
          >
            <HeartIcon onClick={() => console.log("좋아요")} />
            <BellIcon onClick={() => console.log("신고")} />
          </div>
        </Footer>
      </Container>
      <ProfileModal
        user={friend}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default Post;
