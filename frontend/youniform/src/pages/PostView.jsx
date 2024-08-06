import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "@components/Post/SearchBar";
import Posts from "@pages/Post/Posts";
import usePostStore from "@stores/postStore";
import SearchBox from "@components/Post/Search/SearchBox";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`;

const SearchBarContainer = styled.div`
  flex: 0 0 auto;
  border-bottom: ${(props) => (props.$isScrolled ? "1px solid #ccc" : "none")};
  transition: border-bottom 0.3s;
  padding-bottom: 3%;
`;

const ScrollablePostView = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;

const CommunityView = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { posts, fetchPosts } = usePostStore();
  const navigate = useNavigate();
  // const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  console.log(posts);

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const handleSearchBarClick = () => {
    navigate("/search");
    // setIsClicked(!isClicked); // 클릭 시 상태 토글
  };
  return (
    <>
      <Container>
        <SearchBarContainer
          $isScrolled={isScrolled}
          onClick={handleSearchBarClick}
        >
          <SearchBar />
        </SearchBarContainer>
        <ScrollablePostView onScroll={handleScroll}>
          <Posts posts={posts} />
        </ScrollablePostView>
      </Container>
    </>
  );
};

export default CommunityView;
