import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselTest } from "../assets";
import defaultImg from "../assets/carousel/test_1.jpg";

const Div = styled.div`
  margin-top: 50px;
  width: 100%;
  height: calc(100vh - 120px);
  /* display: flex; */
  /* flex-direction: column; */
  /* overflow: hidden; */
  overflow-y: auto;
`;
const Main = styled.div`
  box-sizing: border-box;
  min-height: 40vh;
  height: 25rem;
  max-height: 50vh;
  width: 100%;
  /* border: 5px solid red; */
`;
const TagSection = styled.div`
  /* margin-top: 20rem; */
  height: 10vh;
  /* border: 1px solid blue; */
  position: sticky;
  top: 0;
  overflow: hidden;
  display: flex;
`;
const ArticleSection = styled.div`
  flex: 1;
  border: 1px solid green;
  font-size: 2rem;
  /* top: 40px; */
  /* background-color: pink; */
`;
const articles = [
  {
    id: 1,
    title:
      "'또 역전승!!! 전반기 1위 KIA, 김도영 리드오프 홈런이야야이 삼성 4연패",
    media: "마니아 타임즈",
    date: "2024-07-04",
  },
  {
    id: 2,
    title: "김도영 짱짱",
    media: "마니아 타임즈",
    date: "2024-07-04",
  },
  {
    id: 3,
    title: "최!강!기!아!",
    media: "마니아 타임즈",
    date: "2024-07-04",
  },
  {
    id: 4,
    title: "기아 우승 가보자구",
    media: "마니아 타임즈",
    date: "2024-07-04",
  },
];
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
  /* border: 1px solid red; */
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
  background-color: ${(props) => (props.selected ? "#262F66" : "white")};
  font-family: "Pretendard";
  font-weight: 600;
`;
const Article = styled.div`
  padding: 2%;
  /* border: 1px solid black; */
  height: 8rem;
  display: flex;
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
  height: 50%;
  color: #6d6d6d;
  font-family: "Pretendard";
  font-size: 1.5rem;
  font-weight: 400;
  display: -webkit-box; /* Flexbox for WebKit-based browsers */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Footer = styled.div`
  border: 1px solid purple;
  height: 25%;
  color: #6d6d6d;
  font-family: "Pretendard";
  font-size: 1rem;
`;
const NewsView = () => {
  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "40px",
  };
  const images = Object.values(carouselTest).map((mod) => mod.default);
  const tags = ["All", ...["이대호", "문교원", "정근우"]];
  const [selectedTag, setSelectedTag] = useState("All");

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };
  return (
    <Div>
      <Main>
        <CustomSlider {...settings}>
          {images.map((image, index) => (
            <CardNews key={index}>
              <Image src={image} alt={`Slide ${index}`} />
            </CardNews>
          ))}
        </CustomSlider>
      </Main>
      <TagSection>
        {tags.map((tag, index) => (
          <Tag
            key={index}
            selected={tag === selectedTag}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Tag>
        ))}
      </TagSection>
      <ArticleSection>
        {articles.map((article, index) => (
          <Article key={index}>
            <ArticleImg />
            <ArticleContent>
              <Header>미디어</Header>
              <Title>{article.title}</Title>
              <Footer>날짜</Footer>
            </ArticleContent>
          </Article>
        ))}
      </ArticleSection>
    </Div>
  );
};

export default NewsView;
