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
  const [tagId, setTagId] = useState("");
  useEffect(() => {
    queryParams.current = queryString.parse(location.search);
    setSearchQuery(queryParams.current.q || "");
    setSearchType(queryParams.current.type || "");
    setTagId(queryParams.current.tagId || "");
  }, [location]);

  const [results, setResults] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (tagId){
      console.log("태그가 포함된 게시물 조회를 시작합니다.")
    const fetchResult = async () => {
      const apiClient = getApiClient();
      try {
        console.log(`Search Type: ${searchType}`);
        console.log(`Searching for: ${searchQuery}`);
        console.log(`Search TagId: ${tagId}`);
        const res = await apiClient.get("/posts/tags", {
          params: {
            tagId: tagId,
            // lastPostId: "1",
          },
        });
        console.log(res.data.header.message);
        console.log(res.data.body.postList);
        setResults(res.data.body.postList.content);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    if (searchQuery) {
      fetchResult();
    }
  }
  }, [searchQuery, tagId]);

  const hasSearchParams = Boolean(
    queryParams.current.q || queryParams.current.type
  );
  const renderContent = () => {
    console.log(hasSearchParams, searchQuery)
    if (hasSearchParams) {
      return queryParams.current.q === searchQuery ? (
        <>
        <Posts posts={results} />
        </>
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
    <>
    <Container>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        type={type}
        setSearch={setSearch}
      />
      {/* {type} */}
      <div>{renderContent()}</div>
    </Container>
    </>
  );
};

export default SearchView;
