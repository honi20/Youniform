import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import usePlayerStore from "../../stores/playerStore";
import useNewsStore from "../../stores/newsStore";
import parse from "html-react-parser";
import * as Font from "@/typography";
import { ElderlyWomanSharp } from "@mui/icons-material";
const Div = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: auto;
`;
const TagSection = styled.div`
  height: 50px;
  position: sticky;
  top: 0;
  overflow: hidden;
  display: flex;
  background-color: #f8f8f8;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 5px;
`;
const ArticleSection = styled.div`
  flex: 1;
  font-size: 2rem;
`;
const Tag = styled.div`
  margin: auto 1%;
  width: auto;
  border-radius: 5rem;
  padding: 3% 3.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  // typo
  border: 1px solid #e3e5e8;
  color: ${(props) => (props.selected ? "white" : "#2E3138")};
  background-color: ${(props) =>
    props.selected ? props.theme.primary : "white"};
  font-weight: 600;
`;
const Article = styled.div`
  padding: 2%;
  /* background-color: white; */
  display: flex;
  width: 90%;
  margin: 0 5%;
  justify-content: space-between;
  border-bottom: 1px solid black;
  overflow-y: auto;
  max-height: ${(props) => (props.$expanded ? "1000px" : "150px")};
  cursor: pointer;
  &:first-child {
    border-top: 1px solid black;
  }
`;

const ArticleContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ArticleHeader = styled.div`
  display: flex;
`;
const Content = styled.div`
  ${Font.Small};
  font-weight: 400;
  padding: 7px 0;
  border-top: 1px solid #d3d3d3;
`;
const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.5rem;
  width: 20px;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  background-color: #f8f8f8;
`;
const Title = styled.div`
  ${Font.Medium};
  width: 100%;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box; /* Flexbox for WebKit-based browsers */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Footer = styled.div`
  ${Font.XSmall};
  display: flex;
`;
const NewsView = () => {
  const { playerId } = useParams();
  const { playerList, fetchPlayerList, team, fetchTeamList } = usePlayerStore();
  const [newsList, setNewsList] = useState([]);
  const [tags, setTags] = useState(["All"]);
  const [selectedTagId, setSelectedTagId] = useState(playerId || 0);
  const { news, fetchTotalNews, getTotalNews, getPlayerNews, fetchTeamNews } = useNewsStore();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  useEffect(() => {
    const loadPlayerList = async () => {
      if ((!playerList || playerList.length == 0) && (!team || team.length == 0)) {
        await fetchPlayerList();
        await fetchTeamList();
      };
      if (playerList.length != 0){
      await fetchTotalNews(playerList);
      }
      if (team.length != 0){
        // console.log('test', team)
        await fetchTeamNews(team);
      }
    };
    loadPlayerList();
  }, [playerList, fetchPlayerList, fetchTotalNews, fetchTeamNews, fetchTeamList, team]);

  useEffect(() => {
    if (playerList && playerList.length > 0) {
      setTags([
        { id: 0, name: team.name },
        ...playerList.map((player) => ({
          id: player.playerId,
          name: player.name,
        })),
      ]);
    } else {
      setTags([
        { id: 0, name: team.name },
      ]);
    }
  }, [playerList, team]);
  useEffect(() => {
    if (selectedTagId === 0) {
      setNewsList(getPlayerNews(1000));
    } else {
      setNewsList(getPlayerNews(selectedTagId));
    }
  }, [selectedTagId, getTotalNews, getPlayerNews, news]);
  // // console.log(newsList);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
  };
  const handleArticleClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expansion
  };
  const parseText = (text) => {
    // 줄바꿈을 <br /> 태그로 변환
    const formattedText = text.replace(/\n/g, "<br />");

    // HTML을 JSX로 변환
    return parse(formattedText);
  };
  const moveToLink = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };
  return (
    <Div ref={containerRef}>
      <TagSection>
        {tags.map((tag, index) => (
          <Tag
            key={index}
            selected={tag.id == selectedTagId}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.name} 
          </Tag>
        ))}
      </TagSection>
      <ArticleSection>
        {newsList &&
          newsList.map((news, index) => (
            <Article
              key={index}
              $expandedexpanded={expandedIndex === index}
              onClick={() => handleArticleClick(index)}
            >
              <ArticleContent>
                <ArticleHeader>
                  <div>
                    {news.title ? <Title>{parseText(news.title)}</Title> : null}
                    {news.pubDate ? <Footer>{news.pubDate}</Footer> : null}
                  </div>
                  <ToggleButton
                    $expanded={expanded}
                    onClick={() => setExpanded((prev) => !prev)}
                  >
                    {expandedIndex === index ? "-" : "+"}
                  </ToggleButton>
                </ArticleHeader>

                {expandedIndex === index && (
                  <>
                    {news.description ? <Content onClick={() => moveToLink(news.link)}>
                      {parseText(news.description)}
                    </Content>
                    : null}
                  </>
                )}
              </ArticleContent>
            </Article>
          ))}
        {loading && <div>Loading...</div>}
      </ArticleSection>
    </Div>
  );
};

export default NewsView;
