import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getApiClient } from "@stores/apiClient";
import useUserStore from "@stores/userStore";
import ProfileModal from "@components/Modal/ProfileModal";
const SearchResult = styled.div`
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
const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`
const UserSearch = ({ query, search, setSearch }) => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, fetchUser, friend, loading, error, fetchFriend, clearFriend } = useUserStore();
  useEffect(() => {
    if (search) {
      searchUser(query)
      setSearch(false);
    }
    // console.log(search);
  }, [search]);
  const handleProfileClick = async () => {
    setSelectedUser(post.userId);
    await fetchFriend(post.userId);
    setModalOpen(true);
  };
  useEffect(() => {
    if (selectedUser) {
      return () => clearFriend();
    }
  }, [selectedUser, clearFriend]);
  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
    };
    if (!user) {
      loadUser();
    }
  }, [user, fetchUser]);
  const searchUser = async (query) => {
    if (query) {
      // console.log("유저 검색 시작");
      const apiClient = getApiClient();
      try {
        const res = await apiClient.get(`/users/search`, {
          params: {
            nickname: query,
          },
        });
        // console.log(res.data.header.message);
        // console.log(res.data.body.userList)
        setResults(res.data.body.userList);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    }
  };
  const handleClickUser = async (result) => {
    // console.log(result)
    setSelectedUser(result.userId);
    await fetchFriend(result.userId);
    setModalOpen(true);
  };
  return (
    <>
    <div>
      {results.length > 0 ? (
        results.map((result, index) => (
          <SearchResult key={index} onClick={() => handleClickUser(result)}>
            <ProfileImage src={result.imgUrl} />
            {result.nickname}
          </SearchResult>
        ))
      ) : (
        <SearchResult>검색 결과 없음</SearchResult>
      )}
    </div>
    <ProfileModal
    friend={friend}
    user={user}
    isOpen={isModalOpen}
    onClose={() => setModalOpen(false)}
  />
  </>
  );
};

export default UserSearch;
