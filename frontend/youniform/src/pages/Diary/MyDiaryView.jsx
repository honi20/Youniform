import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useDiaryStore from "@stores/diaryStore";
import DiaryDetailView from "./DiaryDetailView";
import { useParams } from "react-router-dom";
import EmptyState from "@components/Share/EmptyState";
import EmptyIcon from "@assets/EmptyState/EmptyState_Photocard.svg?react";
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
  const [ diaries, setDiaries ] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      if (nickname) {
        console.log(nickname);
      } else {
        await fetchMyDiary();
      }
    };
    fetchData();
  }, [fetchMyDiary, nickname]);

  useEffect(() => {
    setDiaries(nickname ? friendDiary : myDiary);
  }, [nickname, friendDiary, myDiary]);

  const handleScroll = (event) => {
    setIsScrolled(event.target.scrollTop > 0);
  };

  if (!diaries || diaries.length === 0) {
    console.log(diaries);
    return <EmptyState icon={EmptyIcon} state="noDiaries" />;
  }
  return (
    <div>
      <Container>
        <ScrollableDiaryView onScroll={handleScroll}>
          <DiaryDetailView diaries={diaries} />
        </ScrollableDiaryView>
      </Container>
    </div>
  );
};

export default MyDiaryView;
