import React, { useState } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import TagSearch from "@components/Post/Search/TagSearch";
import UserSearch from "@components/Post/Search/UserSearch";
// 검색창 필요할때 이거 나타나야함
const Container = styled.div`
  border: 0.5px solid #dadada;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 4% 8%;
  overflow-y: auto;
  cursor: pointer;
`;
const Header = styled.div`
  height: 40px;
  display: flex;
  margin: 10px 10px 0 10px;
  padding: 0 10px;
  gap: 20px;
`;
const Type = styled.div`
  ${Font.Small};
  font-weight: 400;
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 2.5px solid;
  border-color: ${(props) => (props.$active ? props.theme.primary : "white")};
`;
const SearchResult = styled.div`
  border: 1px solid black;
`;
const Content = styled.div`
  min-height: 100px;
`;
const SearchBox = ({ query, type, setType, search, setSearch }) => {
  const handleTagClick = () => {
    console.log("tag 검색");
    setType("tag");
    console.log("searchBox -", query);
  };

  const handleUserClick = () => {
    console.log("user 검색");
    setType("user");
    console.log("searchBox -", query);
    // 검색해야함
  };

  const renderContent = () => {
    switch (type) {
      case "tag":
        return (
          <TagSearch query={query} search={search} setSearch={setSearch} />
        );
      case "user":
        return (
          <UserSearch query={query} search={search} setSearch={setSearch} />
        );
      default:
        return <div>tag</div>;
    }
  };

  return (
    <Container>
      <Header>
        <Type $active={type === "tag"} onClick={handleTagClick}>
          Tag
        </Type>
        <Type $active={type === "user"} onClick={handleUserClick}>
          User
        </Type>
      </Header>
      <Content>{renderContent()}</Content>
      {/* {results ? (
        results.map((result, index) => (
          <SearchResult key={index}>{result.contents}</SearchResult>
        ))
      ) : (
        <>검색 결과 없음</>
      )} */}
    </Container>
  );
};

export default SearchBox;
