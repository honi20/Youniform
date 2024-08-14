import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import ProfileModal from "../Modal/ProfileModal";
import { getApiClient } from "@stores/apiClient";

const Container = styled.div`
  border: 0.5px solid #dadada;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 0 5%;
  overflow-y: auto;
  cursor: pointer;
  &:not(:first-child) {
    margin: 4% 5%;
  }
  /* height: calc(100vh - 120px); */
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
  & img {
    /* height: 100%; */
    width: 100%;
    object-fit: cover;
  }
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
const HeartSvg = ({ isLiked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill={isLiked ? "#d31818" : "none"}
    >
      <path
        d="M4.45067 14.4082L11.4033 20.9395C11.6428 21.1644 11.7625 21.2769 11.9037 21.3046C11.9673 21.3171 12.0327 21.3171 12.0963 21.3046C12.2375 21.2769 12.3572 21.1644 12.5967 20.9395L19.5493 14.4082C21.5055 12.5706 21.743 9.5466 20.0978 7.42607L19.7885 7.02734C17.8203 4.49058 13.8696 4.91601 12.4867 7.81365C12.2913 8.22296 11.7087 8.22296 11.5133 7.81365C10.1304 4.91601 6.17972 4.49058 4.21154 7.02735L3.90219 7.42607C2.25695 9.5466 2.4945 12.5706 4.45067 14.4082Z"
        stroke="#222222"
      />
    </svg>
  );
};
const HeartContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  gap: 10%;
  justify-content: end;
`;
const HeartIcon = styled(HeartSvg)`
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
  const { user, fetchUser, friend, loading, error, fetchFriend, clearFriend } =
    useUserStore();
  const [like, setLike] = useState(false);
  const handleTagClick = (tag) => {
    console.log(tag, "포스트 포함 태그 검색");
    const encodedQuery = encodeURIComponent(tag.contents);
    navigate(`/search?tagId=${tag.tagId}&q=${encodedQuery}`);
  };
  const convertBrToNewLine = (htmlString) => {
    return htmlString.split("<br>").join("\n");
  };

  const htmlContent = convertBrToNewLine(post.contents);

  useEffect(() => {
    setLike(post.isLiked);
  }, [setLike]);

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

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
    };
    if (!user) {
      loadUser();
    }
  }, [user, fetchUser]);
  const handleLike = async () => {
    const newLike = !like;
    setLike(newLike);
    console.log(newLike);
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post(`/likes/${post.postId}`, {
        isLiked: newLike,
      });
      console.log(res.data.header.message);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };
  return (
    <>
      <Container>
        <Header>
          <HeaderWrapper onClick={handleProfileClick}>
            <ProfileImg src={post.profileImg} />
            {post.nickname}
          </HeaderWrapper>
          <DateWrapper>{post.createdAt}</DateWrapper>
        </Header>
        <Content>
          <img
            onClick={() => navigate(`/post/${post.postId}`)}
            src={post.imageUrl}
          />
          <div onClick={() => navigate(`/post/${post.postId}`)}>
            {htmlContent.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <TagContainer>
            {post &&
              post.tags.map((tag) => {
                return (
                  <Tag key={tag.tagId} onClick={() => handleTagClick(tag)}>
                    # {tag.contents}
                  </Tag>
                );
              })}
          </TagContainer>
        </Content>
        <Footer>
          <CommentContainer onClick={() => navigate(`/post/${post.postId}`)}>
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
            }}
          >
            <HeartContainer onClick={handleLike}>
              <HeartIcon isLiked={like} />
            </HeartContainer>
          </div>
        </Footer>
      </Container>
      {isModalOpen && (
        <ProfileModal
          friend={friend}
          user={user}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default Post;
