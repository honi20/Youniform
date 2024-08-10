import React, { useEffect } from "react";
import styled from "styled-components";
import Post from "@components/Post/Post";

const Container = styled.div`
  /* border: 1px solid black; */
`;
const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      <Container>
        {posts && posts.map((post) => {
          return <Post key={post.postId} post={post} />;
        })}
      </Container>
    </div>
  );
};

export default Posts;
