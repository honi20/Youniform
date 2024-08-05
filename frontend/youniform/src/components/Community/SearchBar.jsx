import React from "react";
import styled from "styled-components";
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
`;

const SearchBar = () => {
  return (
    <Container>
      <SearchIcon />
    </Container>
  );
};

export default SearchBar;
