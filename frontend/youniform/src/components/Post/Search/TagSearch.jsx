import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getApiClient } from "@stores/apiClient";
const SearchResult = styled.div`
  /* border: 1px solid black; */
  height: 50px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid #dadada;
  }
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;
const TagSearch = ({ query, search, setSearch }) => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (search) {
      searchTag(query);
      setSearch(false);
    }
    console.log(search);
  }, [search]);

  const searchTag = async (query) => {
    if (query) {
      console.log("태그 검색 시작");
      const apiClient = getApiClient();
      try {
        const res = await apiClient.get(`/tags`, {
          params: {
            name: query,
          },
        });
        console.log(res.data.header.message);
        setResults(res.data.body.tags);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    }
  };
  const handleClickTag = (result) => {
    console.log(result.contents);
    const encodedQuery = encodeURIComponent(result.contents);
    setResults([]);
    navigate(`/search?type=tag&q=${encodedQuery}`);
  };
  return (
    <div>
      {results ? (
        results.map((result, index) => (
          <SearchResult key={index} onClick={() => handleClickTag(result)}>
            # {result.contents}
          </SearchResult>
        ))
      ) : (
        <>검색 결과 없음</>
      )}
    </div>
  );
};

export default TagSearch;
