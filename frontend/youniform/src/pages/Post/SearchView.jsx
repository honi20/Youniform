import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@components/Post/SearchBar";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import SearchBox from "@components/Post/Search/SearchBox";
import axios from "axios";
import Posts from "./Posts";
import { getApiClient } from "@stores/apiClient";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`;
const SearchView = () => {
  const location = useLocation();
  const queryParams = useRef(queryString.parse(location.search));
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    queryParams.current = queryString.parse(location.search);
    setSearchQuery(queryParams.current.q || "");
    setSearchType(queryParams.current.type || "");
  }, [location]);

  const [results, setResults] = useState([]);
  const [type, setType] = useState("tag");
  const [search, setSearch] = useState(false);
  const API_URL = "http://i11a308.p.ssafy.io:8080";
  useEffect(() => {
    const fetchResult = async () => {
      const apiClient = getApiClient();
      try {
        console.log(`Search Type: ${searchType}`);
        console.log(`Searching for: ${searchQuery}`);
        const res = await apiClient.get("/tags", {
          params: {
            name: searchQuery,
            // lastPostId: "1",
          },
        });
        console.log(res.data.header.message);
        console.log(res.data.body.postList.content);
        setResults(res.data.body.postList.content);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    if (searchQuery) {
      fetchResult();
    }
  }, [searchQuery]);

  const hasSearchParams = Boolean(
    queryParams.current.q || queryParams.current.type
  );
  const renderContent = () => {
    if (hasSearchParams) {
      return queryParams.current.q === searchQuery ? (
        <Posts posts={results} />
      ) : (
        <SearchBox
          query={searchQuery}
          type={type}
          setType={setType}
          search={search}
          setSearch={setSearch}
        />
      );
    } else {
      return searchQuery ? (
        <SearchBox
          query={searchQuery}
          type={type}
          setType={setType}
          search={search}
          setSearch={setSearch}
        />
      ) : (
        <div>친구추천뷰</div>
      );
    }
  };
  return (
    <Container>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        type={type}
        setSearch={setSearch}
      />
      <div>{renderContent()}</div>
    </Container>
  );
};

export default SearchView;
