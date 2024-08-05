import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/Community/SearchBar";
import PostView from "./Community/PostView";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`;

const SearchBarContainer = styled.div`
  flex: 0 0 auto;
  border-bottom: ${(props) => (props.$isScrolled ? "1px solid #ccc" : "none")};
  transition: border-bottom 0.3s;
  /* border: 1px solid black; */
  padding-bottom: 3%;
`;

const ScrollablePostView = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;

const CommunityView = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
        <SearchBarContainer $isScrolled={isScrolled}>
          <SearchBar />
        </SearchBarContainer>
        <ScrollablePostView onScroll={handleScroll}>
          <PostView />
        </ScrollablePostView>
      </Container>
    </>
  );
};

export default CommunityView;
