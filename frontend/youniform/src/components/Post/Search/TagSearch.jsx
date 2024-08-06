import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const SearchResult = styled.div`
  border: 1px solid black;
  height: 50px;
  /* margin:  */
`;
const TagSearch = ({ query }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    searchTag();
  }, [query]);

  const API_URL = "http://i11a308.p.ssafy.io:8080";
  const searchTag = async (query) => {
    try {
      const res = await axios.get(`${API_URL}/tags`, {
        // headers: {
        //   Authorization: "Bearer your_token_here",
        // },
        params: {
          name: query,
          // lastPostId: "",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body.tags);
      setResults(res.data.body.tags);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };
  return (
    <div>
      {results ? (
        results.map((result, index) => (
          <SearchResult key={index}>{result.contents}</SearchResult>
        ))
      ) : (
        <>검색 결과 없음</>
      )}
    </div>
  );
};

export default TagSearch;
