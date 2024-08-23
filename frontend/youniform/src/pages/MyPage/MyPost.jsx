import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostView from "@pages/Post/Posts";
import usePostStore from "@stores/postStore";
import { useParams } from "react-router-dom";
import EmptyState from "../../components/Share/EmptyState";
import EmptyIcon from "@assets/EmptyState/EmptyState_Post.svg?react";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`;

const ScrollablePostView = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;
const MyPost = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { myPosts, fetchMyPosts, friendPosts, fetchFriendPosts } = usePostStore();
  const { nickname } = useParams();
  // console.log(nickname)
  useEffect(() => {
    if (nickname) {
      // fetchFriendPosts(nickname);
      // console.log('test')
    } else {
      fetchMyPosts();
    }
  }, [fetchMyPosts]);

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const postsToShow = nickname ? friendPosts : myPosts;
  if (postsToShow.length == 0) {
    return (
      <EmptyState
      icon={EmptyIcon}
        state="noPosts"
      />
    )
  }
  return (
    <>
      <Container>
        <ScrollablePostView onScroll={handleScroll}>
          <PostView posts={postsToShow} />
        </ScrollablePostView>
      </Container>
    </>
  );
};

export default MyPost;
