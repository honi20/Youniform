import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "@components/Post/SearchBar";
import Posts from "@pages/Post/Posts";
import usePostStore from "@stores/postStore";
import { useNavigate } from "react-router-dom";
import AddSvg from "@assets/Post/add_square.svg?react";

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
const AddBtn = styled.div`
  /* border: 1px solid black; */
  padding: 7px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  bottom: 80px;
  right: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`;
const CommunityView = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { posts, fetchPosts } = usePostStore();
  const navigate = useNavigate();
  // const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const handleSearchBarClick = () => {
    navigate("/search");
  };
  const handleClickAddBtn = () => {
    navigate("/post/write");
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
        <AddBtn onClick={handleClickAddBtn}>
          <AddSvg />
        </AddBtn>
      </Container>
    </>
  );
};

export default CommunityView;
