import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SearchIcon from "@assets/Community/search.svg?react";

const Container = styled.div`
  border: 0.5px solid #dadada;
  border-radius: 40px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 1% 8%;
  height: 40px;
  cursor: text;
  display: flex;
  align-items: center;
  padding: 3%;
  &:hover input::placeholder {
    visibility: visible;
    opacity: 1;
  }
`;
const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 0 8px;
  font-size: 16px;
  ${(props) =>
    props.$hasSearchQuery
      ? css``
      : css`
          &::placeholder {
            opacity: 0;
            transition: opacity 0.3s ease;
          }
        `}
`;

const SearchBar = ({ searchQuery, setSearchQuery, type }) => {
  const [placeholder, setPlaceholder] = useState("검색어를 입력하세요");
  console.log("search Bar - type: ", type);
  useEffect(() => {
    if (searchQuery) {
      setPlaceholder("");
    } else {
      setPlaceholder("검색어를 입력하세요");
    }
  }, [searchQuery]);

  console.log("searchQuery:", searchQuery);
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch(searchQuery);
    }
  };

  const performSearch = (query) => {
    console.log("Searching for:", query);
    // setSearchQuery(e.target.value);
    setPlaceholder("");
  };
  const handleClick = () => {
    if (searchQuery) {
      setPlaceholder("");
      setSearchQuery("");
      // Navigate()
      console.log("test");
    }
  };

  return (
    <Container>
      <SearchIcon />
      <Input
        type="text"
        $hasSearchQuery={searchQuery ? true : false}
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      />
    </Container>
  );
};

export default SearchBar;
