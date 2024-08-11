import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "@components/Post/Post";
import useDiaryStore from "../../stores/diaryStore";
import DiaryDetailView from "./DiaryDetailView";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`;

const ScrollableDiaryView = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;
const MyDiaryView = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { myDiary, fetchMyDiary, friendDiary } = useDiaryStore();
  const { nickname } = useParams();
  useEffect(() => {
    if (nickname) {
console.log(nickname)
    } else {
    fetchMyDiary();
    }
  }, [fetchMyDiary]);

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const diariesToShow = nickname ? friendDiary : myDiary;
  return (
    <div>
      <Container>
        <ScrollableDiaryView onScroll={handleScroll}>
          <DiaryDetailView diaries={diariesToShow} />
        </ScrollableDiaryView>
      </Container>
    </div>
  );
};

export default MyDiaryView;
