import React from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
const SongsWrapper = styled.div`
  height: 80%;
  padding: 5%;
  /* border: 1px solid black; */
`;
// 노래 개수 별 SongsContainer 생성
const SongContainer = styled.div`
  border: 1px solid;
  border-color: ${(props) => props.theme.primary};
  border-radius: 0.625rem;
  height: 3rem;
  margin: 2% 3%;
  padding: 0 3%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //typo
  font-family: "Pretendard";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
`;

const TeamSongComp = ({ songs }) => {
  const theme = useTheme()
  const ExpandRightSvg = () => {
    const color = theme.primary;
    return (
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.25197 6L13.2314 12L8.25197 18"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    );
  };
  const navigate = useNavigate();
  const goToSongPage = (id) => {
    // console.log('test')
    // console.log('Navigating to song with ID:', id); 
    navigate(`./song/${id}`);
  };
  return (
    <>
      <SongsWrapper>
        {songs.map((song) => (
          <SongContainer key={song.teamSongId} onClick={() => goToSongPage(song.teamSongId)}>
            {song.title}
            {ExpandRightSvg()}
          </SongContainer>
        ))}
      </SongsWrapper>
    </>
  );
};

export default TeamSongComp;
