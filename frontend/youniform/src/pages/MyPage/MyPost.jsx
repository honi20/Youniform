import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostView from "@pages/Post/Posts";
import usePostStore from "@stores/postStore";

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
  const { myPosts, fetchMyPosts } = usePostStore();

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  return (
    <>
      <Container>
        <ScrollablePostView onScroll={handleScroll}>
          <PostView posts={myPosts} />
        </ScrollablePostView>
      </Container>
    </>
  );
};

export default MyPost;
