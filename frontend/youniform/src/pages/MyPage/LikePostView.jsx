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
const LikePostView = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { likePosts, fetchLikePosts } = usePostStore();

  useEffect(() => {
    fetchLikePosts();
  }, [fetchLikePosts]);

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
          <PostView posts={likePosts} />
        </ScrollablePostView>
      </Container>
    </>
  );
};

export default LikePostView;
