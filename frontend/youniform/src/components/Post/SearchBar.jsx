import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SearchIcon from "@assets/Post/search.svg?react";
import * as Font from "@/typography";
const Container = styled.div`
  border: 0.5px solid #dadada;
  border-radius: 40px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 1% 5%;
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
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 15px;
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

const Type = styled.div`
${Font.XSmall};
  border: 1px solid #F5F5F5;
  background-color: #F5F5F5;
  border-radius: 5px;
  width: 25px;
  padding: 2px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

`
const SearchBar = ({ searchQuery, setSearchQuery, type, setSearch }) => {
  const [placeholder, setPlaceholder] = useState("검색어를 입력하세요");
  // console.log("search Bar - type: ", type);
  useEffect(() => {
    if (searchQuery) {
      setPlaceholder("");
    } else {
      setPlaceholder("검색어를 입력하세요");
    }
  }, [searchQuery]);

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
    // console.log("Searching for:", query);
    setSearch(true);
    setPlaceholder("");
  };
  const handleClick = () => {
    if (searchQuery) {
      setPlaceholder("");
      // setSearchQuery("");
      // Navigate()
      console.log("test");
    }
  };

  return (
    <Container>
      <SearchIcon />
      { type && <Type>{type}</Type>}
      
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
