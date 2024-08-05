import React, { useEffect } from "react";
import usePostStore from "@stores/postStore";
import styled from "styled-components";
import Post from "@components/Community/Post";

const Posts = styled.div`
  /* border: 1px solid black; */
`;
const PostView = () => {
  const { posts, fetchPosts } = usePostStore();
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  console.log(posts);
  return (
    <div>
      <Posts>
        {posts.map((post) => {
          return <Post key={post.postId} post={post} />;
        })}
      </Posts>
    </div>
  );
};

export default PostView;
