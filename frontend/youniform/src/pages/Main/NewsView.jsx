import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselTest } from "@assets";
import defaultImg from "@assets/carousel/test_1.jpg";
import { useParams } from "react-router-dom";
import usePlayerStore from "../../stores/playerStore";
import useNewsStore from "../../stores/newsStore";

const Div = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: auto;
`;
const Main = styled.div`
  box-sizing: border-box;
  min-height: 40vh;
  height: 25rem;
  max-height: 50vh;
  width: 100%;
`;
const TagSection = styled.div`
  /* height: 10vh; */
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
  /* border: 1px solid green; */
  font-size: 2rem;
`;
const CustomSlider = styled(Slider)`
  height: 100%;
  .slick-slide {
    padding: 0 10px; /* 각 슬라이드 사이에 여백 추가 */
  }

  .slick-slide div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slick-list {
    overflow: hidden;
  }
`;
const CardNews = styled.div`
  width: 100%;
  min-height: 40vh;
  height: 25rem;
  max-height: 50vh;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* background-color: aliceblue; */
  box-sizing: border-box;
  /* aspect-ratio: 5 / 6; */
  /* padding-left: 7%; */
`;
const Image = styled.img`
  width: 100%;
  height: 97%; // Maintain aspect ratio
  object-fit: cover;
  box-sizing: border-box;
  /* border: 1px solid red; */
  border-radius: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  border: 0.5px solid #dadada;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  display: flex;
  margin: 0 5%;
  overflow-y: auto;
  cursor: pointer;
  &:not(:first-child) {
    margin: 4% 5%;
  }
`;
const ArticleImg = styled.div`
  aspect-ratio: 1;
  margin: 2.5%;
  background-image: url(${defaultImg});
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
`;
const ArticleContent = styled.div`
  height: 100%;
`;
const Header = styled.div`
  border: 1px solid green;
  height: 25%;
  color: #6d6d6d;
  font-family: "Pretendard";
  font-size: 1rem;
`;
const Title = styled.div`
  border: 1px solid pink;
  width: 100%;
  height: 50px;
  color: #6d6d6d;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.4;
  display: -webkit-box; /* Flexbox for WebKit-based browsers */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Footer = styled.div`
  border: 1px solid purple;
  height: 25px;
  color: #6d6d6d;
  font-family: "Pretendard";
  font-size: 1rem;
  display: flex;
  /* justify-content: end; */
`;
const NewsView = () => {
  // CAROSEL SETTINGS
  // const settings = {
  //   centerMode: true,
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   centerPadding: "40px",
  // };
  // const images = Object.values(carouselTest).map((mod) => mod.default);

  const { playerId } = useParams();
  const { playerList, fetchPlayerList } = usePlayerStore();
  const [newsList, setNewsList] = useState([]);
  const [tags, setTags] = useState(["All"]);
  const [selectedTagId, setSelectedTagId] = useState(playerId || 0);
  const { news, fetchTotalNews, getTotalNews, getPlayerNews } = useNewsStore();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadPlayerList = async () => {
      if (!playerList || playerList.length == 0) {
        const res = await fetchPlayerList();
        await fetchTotalNews(res);
        console.log(news);
      }
    };
    loadPlayerList();
  }, [playerList, fetchPlayerList, fetchTotalNews]);

  useEffect(() => {
    if (playerList && playerList.length > 0) {
      setTags([
        { id: 0, name: "All" },
        ...playerList.map((player) => ({
          id: player.playerId,
          name: player.name,
        })),
      ]);
    }
  }, [playerList]);

  useEffect(() => {
    if (selectedTagId === 0) {
      setNewsList(getTotalNews());
    } else {
      setNewsList(getPlayerNews(selectedTagId));
    }
  }, [selectedTagId, getTotalNews, getPlayerNews, news]);
  console.log(newsList);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const bottom =
  //       containerRef.current.scrollHeight ===
  //       containerRef.current.scrollTop + containerRef.current.clientHeight;

  //     if (bottom && !loading) {
  //       setLoading(true);
  //       fetchTotalNews(playerList).finally(() => setLoading(false));
  //     }
  //   };

  //   const container = containerRef.current;
  //   container.addEventListener("scroll", handleScroll);

  //   return () => container.removeEventListener("scroll", handleScroll);
  // }, [playerList, loading, fetchTotalNews]);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
  };

  // useEffect(() => {
  //   const loadNews = async () => {
  //     console.log(news.length);
  //     if (news.length == 0) {
  //       console.log("test");
  //       const searchPlayer = playerList.filter(
  //         (player) => player.playerId == selectedTagId
  //       )[0];
  //       console.log(searchPlayer);
  //       await fetchTotalNews();
  //     }
  //   };
  //   loadNews();
  //   console.log(news);
  // }, [fetchNews, news]);

  return (
    <Div ref={containerRef}>
      {/* <Main>
        <CustomSlider {...settings}>
          {images.map((image, index) => (
            <CardNews key={index}>
              <Image src={image} alt={`Slide ${index}`} />
            </CardNews>
          ))}
        </CustomSlider>
      </Main> */}
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
            <Article key={index} onClick={() => console.log(news.link)}>
              <ArticleContent>
                <Title>{news.title}</Title>
                <Header>{news.description}</Header>
                <Footer>{news.pubDate}</Footer>
              </ArticleContent>
            </Article>
          ))}
        {loading && <div>Loading...</div>}
      </ArticleSection>
    </Div>
  );
};

export default NewsView;
