import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DiaryComp from "@components/Diary/Write/DiaryComp";
import { useParams } from "react-router-dom";
import useDiaryStore from "@stores/diaryStore";
import Loading from "@components/Share/Loading";
import Error from "@components/Share/Error";
const Div = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
`;
const Container = styled.div`
  /* border: 5px solid red; */
`;
const ScrollableDiaryView = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;
const DiaryDetailView = ({ diaries }) => {
  const { diaryId } = useParams();
  const { diary, fetchDiary, loading, error } = useDiaryStore();

  useEffect(() => {
    if (diaryId) {
      fetchDiary(diaryId);
    }
  }, [fetchDiary]);

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  if (loading)
    return <Loading />
  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
        <Div>
          <ScrollableDiaryView onScroll={handleScroll}>
            <Container>
              {diaries &&
                diaries.map((diary) => {
                  return <DiaryComp key={diary.diaryId} diary={diary} />;
                })}
            </Container>
          </ScrollableDiaryView>
          {diary ? <DiaryComp key={diary.diaryId} diary={diary} /> : <></>}
        </Div>
    </>
  );
};

export default DiaryDetailView;
