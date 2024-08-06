import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import ProfileModal from "../Modal/ProfileModal";

const Container = styled.div`
  border: 0.5px solid #dadada;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 0 8%;
  overflow-y: auto;
  cursor: pointer;
  &:not(:first-child) {
    margin: 4% 8%;
  }
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
  cursor: pointer;
  /* border: 1px solid pink; */
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
  border: 0.5px solid #dadada;
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
const CommentContainer = styled.div`
  gap: 1%;
  display: flex;
  align-items: center;
  flex: 1;
  /* border: 1px solid black; */
`;
const CommentInfo = styled.div`
  display: flex;
  align-items: center;
`;
import Chatsvg from "@assets/Post/chat.svg?react";
const ChatIcon = styled(Chatsvg)`
  width: 24px;
  height: 24px;
`;
import HeartSvg from "@assets/Post/heart.svg?react";
const HeartIcon = styled(HeartSvg)`
  width: 24px;
  height: 24px;
`;
import BellSvg from "@assets/Post/bell.svg?react";
const BellIcon = styled(BellSvg)`
  width: 24px;
  height: 24px;
`;
import useUserStore from "@stores/userStore";
import { useNavigate } from "react-router-dom";
const Post = ({ post }) => {
  // const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const { friend, loading, error, fetchFriend, clearFriend } = useUserStore();

  const handleTagClick = (tag) => {
    console.log(tag);
    // setSelectedTag(tag.tagId);
    const encodedQuery = encodeURIComponent(tag.contents);
    navigate(`/search?type=tag&q=${encodedQuery}`);
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
          <div onClick={() => navigate(`/post/${post.postId}`)}>
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
                <Tag key={tag.tagId} onClick={() => handleTagClick(tag)}>
                  # {tag.contents}
                </Tag>
              );
            })}
          </TagContainer>
        </Content>
        <Footer>
          <CommentContainer onClick={() => console.log("댓글창")}>
            <ChatIcon />
            {post.commentCount ? (
              <CommentInfo>댓글 {post.commentCount}개 보기</CommentInfo>
            ) : (
              <></>
            )}
          </CommentContainer>
          <div
            style={{
              display: "flex",
              gap: "10%",
              justifyContent: "center",
              // border: "1px solid black",
            }}
          >
            <HeartIcon onClick={() => console.log("좋아요")} />
            {/* <BellIcon onClick={() => console.log("신고")} /> */}
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
