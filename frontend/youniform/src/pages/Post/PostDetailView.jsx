import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import ProfileModal from "@components/Modal/ProfileModal";
import { getApiClient } from "@stores/apiClient";
import Loading from "@components/Share/Loading";

const Container = styled.div`
  border: 0.5px solid #dadada;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 0 8%;
  /* flex: 1; */
  cursor: pointer;
  &:not(:first-child) {
    margin: 4% 8%;
  }
  /* height: auto; */
  /* max-height: calc(100vh - 120px); */
  margin-bottom: 80px;
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
  /* border: 1px solid blue; */
`;
const Content = styled.div`
  ${Font.Medium};
  font-weight: 400;
  margin: 1% 5%;
  & img {
    object-fit: cover;
    width: 100%;
  }
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
  border-bottom: 1px solid #9c9c9c;
  /* border: 1px solid black; */
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
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  flex: 1;
`;
const UpperContainer = styled(FlexBox)`
  ${Font.Small}
  font-weight: 400;
  flex-direction: column;
  /* border: 1px solid red; */
`;

const LowerContainer = styled(FlexBox)`
  ${Font.Small}
  font-weight: 300;
  flex-direction: row;
  justify-content: end;
  flex: 1;
  color: #848484;
`;
const Btn = styled.div`
  text-decoration-line: underline;
`;

import useUserStore from "@stores/userStore";
import usePostStore from "@stores/postStore";
import { useParams, useNavigate } from "react-router-dom";
import CommentContainer from "../../components/Post/Comment/CommentContainer";
import BasicModal from "../../components/Modal/BasicModal";

const PostDetailView = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, fetchUser, friend, fetchFriend } = useUserStore();
  const { post, fetchPost, deletePost, fetchPosts } = usePostStore();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [like, setLike] = useState(null);
  const [editedPost, setEditedPost] = useState(null);
  const [editContent, setEditContent] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
    };
    if (!user) {
      loadUser();
    }
  }, [user, fetchUser]);

  const handleTagClick = (tag) => {
    console.log(tag);
    const encodedQuery = encodeURIComponent(tag.contents);
    navigate(`/search?type=tag&q=${encodedQuery}`);
  };

  const handlePostAction = async ({ action, post }) => {
    if (action === "update") {
      navigate(`/post/write/${post.postId}`, { state: { post } });
    } else if (action === "delete") {
      console.log("test");
      setIsDeleteModalOpen(true);
    }
  };
  const handleProfileClick = async () => {
    setSelectedUser(post.userId);
    await fetchFriend(post.userId);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchPost(postId);
        if (post) {
          setLike(post.isLiked || false);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchPost, postId]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return <div>No Post Found</div>;
  }

  const convertBrToNewLine = (htmlString = "") => {
    return htmlString.split("<br>").join("\n");
  };

  const htmlContent = convertBrToNewLine(post.contents || "");

  const handleLike = async () => {
    const newLike = !like;
    setLike(newLike);
    console.log(newLike);
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post(`/likes/${post.postId}`, {
        isLiked: true,
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };
  const handlePostBtn = async (index) => {
    switch (index) {
      case 1:
        console.log("Button 1 clicked");
        break;
      case 2:
        console.log("Button 2 clicked");
        break;
      case 3:
        await deletePost(post.postId);
        await fetchPosts();
        navigate("/post");
        break;
      default:
        console.log("Unknown button clicked");
        break;
    }
  };
  return (
    <>
      {post ? (
        <Container>
          <Header>
            <HeaderWrapper onClick={handleProfileClick}>
              <ProfileImg src={post.profileImg} />
              {post.nickname}
            </HeaderWrapper>
            <FlexBox>
              {editedPost && editedPost.postId === post.postId ? (
                <>
                  <LowerContainer>
                    <Btn
                      onClick={() =>
                        handlePostAction({
                          action: "update",
                          postId: editedPost.postId,
                          content: editContent, // Pass the edited content here
                        })
                      }
                    >
                      저장
                    </Btn>
                    &nbsp;
                    <Btn onClick={() => setEditedPost(null)}>취소</Btn>
                  </LowerContainer>
                </>
              ) : (
                <LowerContainer>
                  {user.nickname === post.nickname && (
                    <>
                      &nbsp;
                      <Btn
                        onClick={() =>
                          handlePostAction({
                            action: "update",
                            post: post,
                          })
                        }
                      >
                        수정
                      </Btn>
                      &nbsp;
                      <Btn
                        onClick={() =>
                          handlePostAction({
                            action: "delete",
                            post: post,
                          })
                        }
                      >
                        삭제
                      </Btn>
                    </>
                  )}
                </LowerContainer>
              )}
            </FlexBox>
          </Header>
          <Content>
            <div>
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.postId}></img>
              )}
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
            <DateWrapper>{post.createdAt}</DateWrapper>
            <HeartContainer onClick={handleLike}>
              <HeartIcon isLiked={like !== null ? like : post.isLiked} />
            </HeartContainer>
          </Footer>
          <CommentContainer postId={post.postId} user={user} />
        </Container>
      ) : (
        <>엥</>
      )}
      <ProfileModal
        user={user}
        friend={friend}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      {isDeleteModalOpen && (
        <BasicModal
          state="PostDeleted"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onButtonClick={(index) => {
            handlePostBtn(index);
          }}
        />
      )}
    </>
  );
};
export default PostDetailView;
